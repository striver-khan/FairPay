// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import {SepoliaConfig} from "@fhevm/solidity/config/ZamaConfig.sol";
import {FHE, euint64} from "@fhevm/solidity/lib/FHE.sol"; 


contract FairPay1 is SepoliaConfig {
    enum NegotiationState {
        NOT_STARTED,
        EMPLOYER_SUBMITTED,
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
        // Encrypted salary ranges
        euint64 employerMin;
        euint64 employerMax;
        euint64 candidateMin;
        euint64 candidateMax;
        //Results 
        bool hasMatchResult;
        bool matchRevealed;
        euint64 agreedSalary;
        uint64 decryptedMeetingPoint; // For simplicity, store decrypted meeting point directly ?
    }

    struct NegotiationSummary {
        uint256 negotiationId;
        address employer;
        address candidate;
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
    event MatchRevealed(
        uint256 indexed negotiationId,
        bool hasMatch,
        uint64 meetingPoint
    );
    
    // Debug events
    event CallbackAttempted(uint256 indexed requestId, uint256 indexed negotiationId);
    event CallbackSucceeded(uint256 indexed requestId, uint256 indexed negotiationId);
    event CallbackFailed(uint256 indexed requestId, uint256 indexed negotiationId, string reason);

    // --- Constructor ---
    constructor() {}

    function createNegotiation( address _candidate, string calldata _title, uint256 _deadlineDuration) external returns (uint256) {

        require(_candidate != address(0), "Invalid candidate address");
        require(_candidate != msg.sender, "Employer and candidate must differ");
        require(bytes(_title).length > 0 && bytes(_title).length <= 100, "Invalid title length");
        require(_deadlineDuration >= 3600, "Deadline must be at least 1 hour"); // Minimum 1 hour

        uint256 negotiationId = negotiationCounter++;
        Negotiation storage neg = negotiations[negotiationId];

        neg.negotiationId = negotiationId;
        neg.employer = msg.sender;
        neg.candidate = _candidate;
        neg.state = NegotiationState.NOT_STARTED;
        neg.title = _title;
        neg.createdAt = block.timestamp;
        neg.deadline = block.timestamp + _deadlineDuration;

        // Track for both parties
        userNegotiations[msg.sender].push(negotiationId);
        userNegotiations[_candidate].push(negotiationId);

        emit NegotiationCreated(negotiationId, msg.sender, _candidate, _title, neg.deadline);
        return negotiationId;

    }





}