// SPDX-License-Identifier: BSD-3-Clause-Clear
pragma solidity ^0.8.24;

import {FHE, euint64, externalEuint64, ebool} from "@fhevm/solidity/lib/FHE.sol";
import {SepoliaConfig} from "@fhevm/solidity/config/ZamaConfig.sol";

/**
 * @title FairPay
 * @notice Privacy-preserving salary negotiation using Fully Homomorphic Encryption
 */
contract FairPay is SepoliaConfig {
    enum NegotiationState {
        NOT_STARTED,
        EMPLOYER_SUBMITTED,
        CANDIDATE_PENDING_VALIDATION,
        CANDIDATE_SUBMITTED,
        COMPLETED
    }

    struct Negotiation {
        uint256 negotiationId;
        address employer;
        address candidate;
        NegotiationState state;
        string title;
        uint256 createdAt;
        uint256 deadline;
        euint64 employerMin;
        euint64 employerMax;
        euint64 candidateMin;
        euint64 candidateMax;
        bool hasMatchResult;
        bool matchRevealed;
        uint64 decryptedMeetingPoint;
    }

    struct NegotiationSummary {
        uint256 negotiationId;
        address employer;
        address candidate;
        string title;
        NegotiationState state;
        uint256 createdAt;
        uint256 deadline;
        bool hasMatchResult;
        bool matchRevealed;
        uint64 meetingPoint;
    }

    uint256 public negotiationCounter;
    mapping(uint256 => Negotiation) public negotiations;

    mapping(uint256 => uint256) private requestToNegotiationId;
    mapping(uint256 => uint256) public latestRequestId;
    mapping(uint256 => bool) public isDecryptionPending;
    mapping(uint256 => string) public lastCallbackError;

    mapping(address => uint256[]) private userNegotiations;

    event NegotiationCreated(
        uint256 indexed negotiationId,
        address indexed employer,
        address indexed candidate,
        string title,
        uint256 deadline
    );
    event EmployerRangeSubmitted(uint256 indexed negotiationId, address indexed employer);
    event CandidateRangeSubmitted(uint256 indexed negotiationId, address indexed candidate);
    event MatchCalculationStarted(uint256 indexed negotiationId);
    event MatchRevealed(uint256 indexed negotiationId, bool hasMatch, uint64 meetingPoint);

    event CallbackAttempted(uint256 indexed requestId, uint256 indexed negotiationId);
    event CallbackSucceeded(uint256 indexed requestId, uint256 indexed negotiationId);
    event CallbackFailed(uint256 indexed requestId, uint256 indexed negotiationId, string reason);

    constructor() {}

    function createNegotiation(
        address _candidate,
        string calldata _title,
        uint256 _deadlineDuration
    ) external returns (uint256) {
        require(_candidate != address(0), "Invalid candidate address");
        require(_candidate != msg.sender, "Employer and candidate must differ");
        require(bytes(_title).length > 0 && bytes(_title).length <= 100, "Invalid title length");
        require(_deadlineDuration >= 3600, "Deadline must be at least 1 hour");

        uint256 negotiationId = negotiationCounter;
        negotiationCounter += 1;

        Negotiation storage neg = negotiations[negotiationId];
        neg.negotiationId = negotiationId;
        neg.employer = msg.sender;
        neg.candidate = _candidate;
        neg.state = NegotiationState.NOT_STARTED;
        neg.title = _title;
        neg.createdAt = block.timestamp;
        neg.deadline = block.timestamp + _deadlineDuration;

        userNegotiations[msg.sender].push(negotiationId);
        userNegotiations[_candidate].push(negotiationId);

        emit NegotiationCreated(negotiationId, msg.sender, _candidate, _title, neg.deadline);
        return negotiationId;
    }

    function submitEmployerRange(
        uint256 negotiationId,
        externalEuint64 encryptedMin,
        externalEuint64 encryptedMax,
        bytes calldata inputProof
    ) external {
        require(negotiationId < negotiationCounter, "Negotiation does not exist");
        Negotiation storage neg = negotiations[negotiationId];
        require(msg.sender == neg.employer, "Only employer can submit");
        require(neg.state == NegotiationState.NOT_STARTED, "Employer already submitted");
        require(block.timestamp < neg.deadline, "Negotiation deadline passed");

        euint64 min = FHE.fromExternal(encryptedMin, inputProof);
        euint64 max = FHE.fromExternal(encryptedMax, inputProof);

        FHE.allowThis(min);
        FHE.allowThis(max);

        ebool validRange = FHE.le(min, max);
        FHE.allowThis(validRange);

        // <<< CORRECT: create bytes32[] before assigning
        bytes32[] memory toDecrypt = new bytes32[](1);
        toDecrypt[0] = FHE.toBytes32(validRange);

        uint256 requestId = FHE.requestDecryption(toDecrypt, this.callbackValidateEmployerRange.selector);

        neg.employerMin = min;
        neg.employerMax = max;

        requestToNegotiationId[requestId] = negotiationId;
        latestRequestId[negotiationId] = requestId;
        isDecryptionPending[negotiationId] = true;

        emit EmployerRangeSubmitted(negotiationId, msg.sender);
    }

    function callbackValidateEmployerRange(
        uint256 requestId,
        bool isValid,
        bytes memory cleartexts,
        bytes memory decryptionProof
    ) public {
        // FHE.checkSignatures(requestId, cleartexts, decryptionProof); //

        uint256 negotiationId = requestToNegotiationId[requestId];
        require(negotiationId < negotiationCounter, "Invalid negotiation ID");

        Negotiation storage neg = negotiations[negotiationId];
        require(isValid, "Invalid range: employer min must be <= max");

        neg.state = NegotiationState.EMPLOYER_SUBMITTED;

        delete requestToNegotiationId[requestId];
        latestRequestId[negotiationId] = requestId;
        isDecryptionPending[negotiationId] = false;
    }

    function submitCandidateRange(
        uint256 negotiationId,
        externalEuint64 encryptedMin,
        externalEuint64 encryptedMax,
        bytes calldata inputProof
    ) external {
        require(negotiationId < negotiationCounter, "Negotiation does not exist");
        Negotiation storage neg = negotiations[negotiationId];
        require(msg.sender == neg.candidate, "Only candidate can submit");
        require(neg.state == NegotiationState.EMPLOYER_SUBMITTED, "Employer must submit first");
        require(block.timestamp < neg.deadline, "Negotiation deadline passed");

        euint64 min = FHE.fromExternal(encryptedMin, inputProof);
        euint64 max = FHE.fromExternal(encryptedMax, inputProof);

        FHE.allowThis(min);
        FHE.allowThis(max);

        ebool validRange = FHE.le(min, max);
        FHE.allowThis(validRange);

        neg.candidateMin = min;
        neg.candidateMax = max;

        // <<< CORRECT: create bytes32[] before assigning
        bytes32[] memory toDecrypt = new bytes32[](1);
        toDecrypt[0] = FHE.toBytes32(validRange);

        uint256 requestId = FHE.requestDecryption(toDecrypt, this.callbackValidateCandidateRange.selector);

        requestToNegotiationId[requestId] = negotiationId;
        latestRequestId[negotiationId] = requestId;
        isDecryptionPending[negotiationId] = true;

        neg.state = NegotiationState.CANDIDATE_PENDING_VALIDATION;

        emit CandidateRangeSubmitted(negotiationId, msg.sender);
    }

    function callbackValidateCandidateRange(
        uint256 requestId,
        bool isValid,
        bytes memory cleartexts,
        bytes memory decryptionProof
    ) public {
        // FHE.checkSignatures(requestId, cleartexts, decryptionProof); //
        uint256 negotiationId = requestToNegotiationId[requestId];
        require(negotiationId < negotiationCounter, "Invalid negotiation ID");

        Negotiation storage neg = negotiations[negotiationId];

        require(isValid, "Invalid range: candidate min must be <= max");

        neg.state = NegotiationState.CANDIDATE_SUBMITTED;

        delete requestToNegotiationId[requestId];
        latestRequestId[negotiationId] = requestId;
        isDecryptionPending[negotiationId] = false;

        _calculateMatch(negotiationId);
    }

    function _calculateMatch(uint256 negotiationId) internal {
        require(negotiationId < negotiationCounter, "Negotiation does not exist");
        Negotiation storage neg = negotiations[negotiationId];
        require(neg.state == NegotiationState.CANDIDATE_SUBMITTED, "Not ready for calculation");
        require(!isDecryptionPending[negotiationId], "Another decryption pending");
        require(block.timestamp < neg.deadline, "Negotiation deadline passed");

        isDecryptionPending[negotiationId] = true;
        emit MatchCalculationStarted(negotiationId);

        ebool condition1 = FHE.le(neg.candidateMin, neg.employerMax);
        ebool condition2 = FHE.le(neg.employerMin, neg.candidateMax);
        ebool hasMatch = FHE.and(condition1, condition2);

        FHE.allowThis(condition1);
        FHE.allowThis(condition2);
        FHE.allowThis(hasMatch);

        ebool employerMinIsGreater = FHE.ge(neg.employerMin, neg.candidateMin);
        euint64 overlapMin = FHE.select(employerMinIsGreater, neg.employerMin, neg.candidateMin);

        ebool employerMaxIsLess = FHE.le(neg.employerMax, neg.candidateMax);
        euint64 overlapMax = FHE.select(employerMaxIsLess, neg.employerMax, neg.candidateMax);

        FHE.allowThis(overlapMin);
        FHE.allowThis(overlapMax);

        euint64 sum = FHE.add(overlapMin, overlapMax);
        // euint64 two = FHE.asEuint64(2);
        // euint64 meetingPoint = FHE.div(sum, two);
        euint64 meetingPoint = FHE.shr(sum, 1);

        FHE.allowThis(sum);
        // FHE.allowThis(two);
        FHE.allowThis(meetingPoint);

        euint64 zero = FHE.asEuint64(0);
        euint64 finalMeetingPoint = FHE.select(hasMatch, meetingPoint, zero);

        FHE.allowThis(zero);
        FHE.allowThis(finalMeetingPoint);

        // <<< CORRECT: create bytes32[] (2 elements) before assigning
        bytes32[] memory toDecrypt = new bytes32[](2);
        toDecrypt[0] = FHE.toBytes32(hasMatch);
        toDecrypt[1] = FHE.toBytes32(finalMeetingPoint);

        uint256 requestId = FHE.requestDecryption(toDecrypt, this.callbackRevealMatch.selector);

        requestToNegotiationId[requestId] = negotiationId;
        latestRequestId[negotiationId] = requestId;
        // isDecryptionPending stays true until callback returns
    }

    function callbackRevealMatch(
        uint256 requestId,
        bool hasMatch,
        uint64 meetingPoint,
        bytes memory cleartexts,
        bytes memory decryptionProof
    ) public {
        uint256 negotiationId = requestToNegotiationId[requestId];
        emit CallbackAttempted(requestId, negotiationId);

        try this._processMatchResult(requestId, hasMatch, meetingPoint, cleartexts, decryptionProof) {
            isDecryptionPending[negotiationId] = false;
            emit CallbackSucceeded(requestId, negotiationId);
        } catch Error(string memory reason) {
            lastCallbackError[negotiationId] = reason;
            emit CallbackFailed(requestId, negotiationId, reason);
            if (negotiationId < negotiationCounter) {
                negotiations[negotiationId].state = NegotiationState.CANDIDATE_SUBMITTED;
                isDecryptionPending[negotiationId] = false;
            }
        } catch (bytes memory) {
            lastCallbackError[negotiationId] = "Low level error";
            emit CallbackFailed(requestId, negotiationId, "Low level error");
            if (negotiationId < negotiationCounter) {
                negotiations[negotiationId].state = NegotiationState.CANDIDATE_SUBMITTED;
                isDecryptionPending[negotiationId] = false;
            }
        }
    }

    function _processMatchResult(
        uint256 requestId,
        bool hasMatch,
        uint64 meetingPoint,
        bytes memory cleartexts,
        bytes memory decryptionProof
    ) external {
        // FHE.checkSignatures(requestId, cleartexts, decryptionProof); // j

        uint256 negotiationId = requestToNegotiationId[requestId];
        require(negotiationId < negotiationCounter, "Invalid negotiation ID");

        Negotiation storage neg = negotiations[negotiationId];
        require(neg.state == NegotiationState.CANDIDATE_SUBMITTED, "Invalid state");

        neg.hasMatchResult = hasMatch;
        neg.matchRevealed = true;
        neg.decryptedMeetingPoint = meetingPoint;
        neg.state = NegotiationState.COMPLETED;

        delete requestToNegotiationId[requestId];
        latestRequestId[negotiationId] = requestId;
    }

    function getNegotiationSummary(uint256 negotiationId) external view returns (NegotiationSummary memory) {
        require(negotiationId < negotiationCounter, "Negotiation does not exist");
        Negotiation storage neg = negotiations[negotiationId];

        return
            NegotiationSummary({
                negotiationId: neg.negotiationId,
                employer: neg.employer,
                candidate: neg.candidate,
                title: neg.title,
                state: neg.state,
                createdAt: neg.createdAt,
                deadline: neg.deadline,
                hasMatchResult: neg.hasMatchResult,
                matchRevealed: neg.matchRevealed,
                meetingPoint: neg.decryptedMeetingPoint
            });
    }

    function getUserNegotiations(address user) external view returns (uint256[] memory) {
        return userNegotiations[user];
    }

    function isParticipant(uint256 negotiationId, address user) external view returns (bool) {
        require(negotiationId < negotiationCounter, "Negotiation does not exist");
        Negotiation storage neg = negotiations[negotiationId];
        return (user == neg.employer || user == neg.candidate);
    }

    function getNegotiationState(uint256 negotiationId) external view returns (NegotiationState) {
        require(negotiationId < negotiationCounter, "Negotiation does not exist");
        return negotiations[negotiationId].state;
    }

    function getMatchResult(uint256 negotiationId) external view returns (bool hasMatch, uint64 meetingPoint) {
        require(negotiationId < negotiationCounter, "Negotiation does not exist");
        Negotiation storage neg = negotiations[negotiationId];
        require(neg.matchRevealed, "Match not yet revealed");
        return (neg.hasMatchResult, neg.decryptedMeetingPoint);
    }

    function getTotalNegotiations() external view returns (uint256) {
        return negotiationCounter;
    }

    function getCallbackDebugInfo(
        uint256 negotiationId
    ) external view returns (bool isPending, uint256 requestId, string memory lastError) {
        return (isDecryptionPending[negotiationId], latestRequestId[negotiationId], lastCallbackError[negotiationId]);
    }

    function isExpired(uint256 negotiationId) external view returns (bool) {
        require(negotiationId < negotiationCounter, "Negotiation does not exist");
        return block.timestamp >= negotiations[negotiationId].deadline;
    }
}
