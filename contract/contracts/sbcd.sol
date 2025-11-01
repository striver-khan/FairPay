// // SPDX-License-Identifier: BSD-3-Clause-Clear
// pragma solidity ^0.8.20;

// import {FHE, euint32, euint64, externalEuint64, ebool} from "@fhevm/solidity/lib/FHE.sol";
// import {SepoliaConfig} from "@fhevm/solidity/config/ZamaConfig.sol";

// /**
//  * @title FairPay
//  * @notice Privacy-preserving salary negotiation using Fully Homomorphic Encryption
//  * @dev Allows employers and job seekers to negotiate without revealing initial offers
//  */
// contract FairPay is SepoliaConfig {
//     // --- Negotiation States ---
//     enum NegotiationState {
//         NOT_STARTED,
//         EMPLOYER_SUBMITTED,
//         CANDIDATE_SUBMITTED,
//         COMPLETED
//     }

//     // --- Data Structures ---
//     struct Negotiation {
//         uint256 negotiationId;
//         address employer;
//         address candidate;
//         NegotiationState state;
//         string title;
//         uint256 createdAt;
//         uint256 deadline;
//         // Encrypted salary ranges
//         euint64 employerMin;
//         euint64 employerMax;
//         euint64 candidateMin;
//         euint64 candidateMax;
//         // Results
//         bool hasMatchResult;
//         bool matchRevealed;
//         uint64 decryptedMeetingPoint;
//     }

//     struct NegotiationSummary {
//         uint256 negotiationId;
//         address employer;
//         address candidate;
//         string title;
//         NegotiationState state;
//         uint256 createdAt;
//         uint256 deadline;
//         bool hasMatchResult;
//         bool matchRevealed;
//         uint64 meetingPoint;
//     }

//     // --- State Variables ---
//     uint256 public negotiationCounter;
//     mapping(uint256 => Negotiation) public negotiations;
    
//     // Decryption request tracking
//     mapping(uint256 => uint256) private requestToNegotiationId;
//     mapping(uint256 => uint256) public latestRequestId;
//     mapping(uint256 => bool) public isDecryptionPending;
//     mapping(uint256 => string) public lastCallbackError;

//     // User activity tracking
//     mapping(address => uint256[]) private userNegotiations;

//     // --- Events ---
//     event NegotiationCreated(
//         uint256 indexed negotiationId,
//         address indexed employer,
//         address indexed candidate,
//         string title,
//         uint256 deadline
//     );
//     event EmployerRangeSubmitted(uint256 indexed negotiationId, address indexed employer);
//     event CandidateRangeSubmitted(uint256 indexed negotiationId, address indexed candidate);
//     event MatchCalculationStarted(uint256 indexed negotiationId);
//     event MatchRevealed(
//         uint256 indexed negotiationId,
//         bool hasMatch,
//         uint64 meetingPoint
//     );
    
//     // Debug events
//     event CallbackAttempted(uint256 indexed requestId, uint256 indexed negotiationId);
//     event CallbackSucceeded(uint256 indexed requestId, uint256 indexed negotiationId);
//     event CallbackFailed(uint256 indexed requestId, uint256 indexed negotiationId, string reason);

//     // --- Constructor ---
//     constructor() {}

//     // --- Core Functions ---

//     /**
//      * @notice Create a new salary negotiation
//      * @param _candidate Address of the job candidate
//      * @param _title Title/description of the negotiation
//      * @param _deadlineDuration Duration in seconds until negotiation expires
//      * @return negotiationId The ID of the created negotiation
//      */
//     function createNegotiation(
//         address _candidate,
//         string calldata _title,
//         uint256 _deadlineDuration
//     ) external returns (uint256) {
//         require(_candidate != address(0), "Invalid candidate address");
//         require(_candidate != msg.sender, "Employer and candidate must differ");
//         require(bytes(_title).length > 0 && bytes(_title).length <= 100, "Invalid title length");
//         require(_deadlineDuration >= 3600, "Deadline must be at least 1 hour"); // Minimum 1 hour

//         uint256 negotiationId = negotiationCounter++;
//         Negotiation storage neg = negotiations[negotiationId];
        
//         neg.negotiationId = negotiationId;
//         neg.employer = msg.sender;
//         neg.candidate = _candidate;
//         neg.state = NegotiationState.NOT_STARTED;
//         neg.title = _title;
//         neg.createdAt = block.timestamp;
//         neg.deadline = block.timestamp + _deadlineDuration;

//         // Track for both parties
//         userNegotiations[msg.sender].push(negotiationId);
//         userNegotiations[_candidate].push(negotiationId);

//         emit NegotiationCreated(negotiationId, msg.sender, _candidate, _title, neg.deadline);
//         return negotiationId;
//     }

//     /**
//      * @notice Employer submits encrypted salary range
//      * @param negotiationId The negotiation ID
//      * @param encryptedMin Encrypted minimum salary willing to pay
//      * @param encryptedMax Encrypted maximum salary willing to pay
//      * @param inputProof Proof for the encrypted inputs
//      */
//     function submitEmployerRange(
//         uint256 negotiationId,
//         externalEuint64 encryptedMin,
//         externalEuint64 encryptedMax,
//         bytes calldata inputProof
//     ) external {
//         Negotiation storage neg = negotiations[negotiationId];
//         require(msg.sender == neg.employer, "Only employer can submit");
//         require(neg.state == NegotiationState.NOT_STARTED, "Employer already submitted");
//         require(block.timestamp < neg.deadline, "Negotiation deadline passed");

//         // Convert encrypted inputs to euint64
//         euint64 min = FHE.fromExternal(encryptedMin, inputProof);
//         euint64 max = FHE.fromExternal(encryptedMax, inputProof);
        
//         FHE.allowThis(min);
//         FHE.allowThis(max);

//         // Validate that min <= max (encrypted comparison)
//         ebool validRange = FHE.le(min, max);
//         FHE.allowThis(validRange);
//         // Request decryption to validate range
//         uint256 requestId = FHE.requestDecryption(
//             FHE.toBytes32(validRange),
//             this.callbackValidateEmployerRange.selector
//         );
        
//         requestToNegotiationId[requestId] = negotiationId;
        
//         // Store encrypted values temporarily
//         neg.employerMin = min;
//         neg.employerMax = max;

//         emit EmployerRangeSubmitted(negotiationId, msg.sender);
//     }

//     /**
//      * @notice Callback to validate employer range
//      */
//     function callbackValidateEmployerRange(
//         uint256 requestId,
//         bool isValid,
//         bytes[] memory signatures
//     ) public {
//         FHE.checkSignatures(requestId, signatures);
        
//         uint256 negotiationId = requestToNegotiationId[requestId];
//         require(negotiationId < negotiationCounter, "Invalid negotiation ID");
        
//         Negotiation storage neg = negotiations[negotiationId];
//         require(isValid, "Invalid range: min must be <= max");
        
//         neg.state = NegotiationState.EMPLOYER_SUBMITTED;
//         delete requestToNegotiationId[requestId];
//     }

//     /**
//      * @notice Candidate submits encrypted salary range
//      * @param negotiationId The negotiation ID
//      * @param encryptedMin Encrypted minimum salary willing to accept
//      * @param encryptedMax Encrypted maximum salary desired
//      * @param inputProof Proof for the encrypted inputs
//      */
//     function submitCandidateRange(
//         uint256 negotiationId,
//         externalEuint64 encryptedMin,
//         externalEuint64 encryptedMax,
//         bytes calldata inputProof
//     ) external {
//         Negotiation storage neg = negotiations[negotiationId];
//         require(msg.sender == neg.candidate, "Only candidate can submit");
//         require(neg.state == NegotiationState.EMPLOYER_SUBMITTED, "Employer must submit first");
//         require(block.timestamp < neg.deadline, "Negotiation deadline passed");

//         // Convert encrypted inputs to euint64
//         euint64 min = FHE.fromExternal(encryptedMin, inputProof);
//         euint64 max = FHE.fromExternal(encryptedMax, inputProof);
        
//         FHE.allowThis(min);
//         FHE.allowThis(max);

//         // Validate that min <= max (encrypted comparison)
//         ebool validRange = FHE.lte(min, max);
//         FHE.allowThis(validRange);
        
//         // For simplicity, we'll validate and calculate match in one step
//         neg.candidateMin = min;
//         neg.candidateMax = max;
//         neg.state = NegotiationState.CANDIDATE_SUBMITTED;

//         emit CandidateRangeSubmitted(negotiationId, msg.sender);

//         // Automatically trigger match calculation
//         _calculateMatch(negotiationId);
//     }

//     /**
//      * @notice Internal function to calculate if ranges overlap and find meeting point
//      * @param negotiationId The negotiation ID
//      */
//     function _calculateMatch(uint256 negotiationId) internal {
//         Negotiation storage neg = negotiations[negotiationId];
//         require(neg.state == NegotiationState.CANDIDATE_SUBMITTED, "Not ready for calculation");
        
//         isDecryptionPending[negotiationId] = true;
//         emit MatchCalculationStarted(negotiationId);

//         // Calculate overlap check and meeting point in encrypted space
//         // Overlap exists if: candidateMin <= employerMax AND employerMin <= candidateMax
//         ebool condition1 = FHE.lte(neg.candidateMin, neg.employerMax);
//         ebool condition2 = FHE.lte(neg.employerMin, neg.candidateMax);
//         ebool hasMatch = FHE.and(condition1, condition2);
        
//         FHE.allowThis(condition1);
//         FHE.allowThis(condition2);
//         FHE.allowThis(hasMatch);

//         // Calculate meeting point (midpoint of overlap)
//         // overlapMin = max(employerMin, candidateMin)
//         ebool employerMinIsGreater = FHE.gte(neg.employerMin, neg.candidateMin);
//         euint64 overlapMin = FHE.select(employerMinIsGreater, neg.employerMin, neg.candidateMin);
        
//         // overlapMax = min(employerMax, candidateMax)
//         ebool employerMaxIsLess = FHE.lte(neg.employerMax, neg.candidateMax);
//         euint64 overlapMax = FHE.select(employerMaxIsLess, neg.employerMax, neg.candidateMax);
        
//         FHE.allowThis(overlapMin);
//         FHE.allowThis(overlapMax);

//         // Calculate midpoint: (overlapMin + overlapMax) / 2
//         euint64 sum = FHE.add(overlapMin, overlapMax);
//         euint64 two = FHE.asEuint64(2);
//         euint64 meetingPoint = FHE.div(sum, two);
        
//         FHE.allowThis(sum);
//         FHE.allowThis(two);
//         FHE.allowThis(meetingPoint);

//         // Only use meeting point if there's a match, otherwise set to 0
//         euint64 zero = FHE.asEuint64(0);
//         euint64 finalMeetingPoint = FHE.select(hasMatch, meetingPoint, zero);
        
//         FHE.allowThis(zero);
//         FHE.allowThis(finalMeetingPoint);

//         // Prepare for decryption - we need both hasMatch and meetingPoint
//         bytes32[] memory toDecrypt = new bytes32[](2);
//         toDecrypt[0] = FHE.toBytes32(hasMatch);
//         toDecrypt[1] = FHE.toBytes32(finalMeetingPoint);

//         // Request decryption
//         uint256 requestId = FHE.requestDecryption(
//             toDecrypt,
//             this.callbackRevealMatch.selector
//         );

//         requestToNegotiationId[requestId] = negotiationId;
//         latestRequestId[negotiationId] = requestId;
//     }

//     /**
//      * @notice Callback to reveal match results
//      * @param requestId Decryption request ID
//      * @param hasMatch Whether ranges overlap
//      * @param meetingPoint The calculated meeting point (0 if no match)
//      * @param signatures Verification signatures
//      */
//     function callbackRevealMatch(
//         uint256 requestId,
//         bool hasMatch,
//         uint64 meetingPoint,
//         bytes[] memory signatures
//     ) public {
//         uint256 negotiationId = requestToNegotiationId[requestId];
//         emit CallbackAttempted(requestId, negotiationId);
        
//         try this._processMatchResult(requestId, hasMatch, meetingPoint, signatures) {
//             isDecryptionPending[negotiationId] = false;
//             emit CallbackSucceeded(requestId, negotiationId);
//         } catch Error(string memory reason) {
//             lastCallbackError[negotiationId] = reason;
//             emit CallbackFailed(requestId, negotiationId, reason);
//             if (negotiationId < negotiationCounter) {
//                 negotiations[negotiationId].state = NegotiationState.CANDIDATE_SUBMITTED;
//                 isDecryptionPending[negotiationId] = false;
//             }
//         } catch (bytes memory) {
//             lastCallbackError[negotiationId] = "Low level error";
//             emit CallbackFailed(requestId, negotiationId, "Low level error");
//             if (negotiationId < negotiationCounter) {
//                 negotiations[negotiationId].state = NegotiationState.CANDIDATE_SUBMITTED;
//                 isDecryptionPending[negotiationId] = false;
//             }
//         }
//     }

//     /**
//      * @notice Internal function to process match result
//      */
//     function _processMatchResult(
//         uint256 requestId,
//         bool hasMatch,
//         uint64 meetingPoint,
//         bytes[] memory signatures
//     ) external {
//         // Verify signatures
//         FHE.checkSignatures(requestId, signatures);
        
//         uint256 negotiationId = requestToNegotiationId[requestId];
//         require(negotiationId < negotiationCounter, "Invalid negotiation ID");
        
//         Negotiation storage neg = negotiations[negotiationId];
//         require(neg.state == NegotiationState.CANDIDATE_SUBMITTED, "Invalid state");
        
//         // Store results
//         neg.hasMatchResult = hasMatch;
//         neg.matchRevealed = true;
//         neg.decryptedMeetingPoint = meetingPoint;
//         neg.state = NegotiationState.COMPLETED;
        
//         // Clean up
//         delete requestToNegotiationId[requestId];
        
//         emit MatchRevealed(negotiationId, hasMatch, meetingPoint);
//     }

//     // --- View Functions ---

//     /**
//      * @notice Get negotiation summary
//      * @param negotiationId The negotiation ID
//      * @return summary Negotiation summary
//      */
//     function getNegotiationSummary(uint256 negotiationId)
//         external
//         view
//         returns (NegotiationSummary memory)
//     {
//         require(negotiationId < negotiationCounter, "Negotiation does not exist");
//         Negotiation storage neg = negotiations[negotiationId];
        
//         return NegotiationSummary({
//             negotiationId: neg.negotiationId,
//             employer: neg.employer,
//             candidate: neg.candidate,
//             title: neg.title,
//             state: neg.state,
//             createdAt: neg.createdAt,
//             deadline: neg.deadline,
//             hasMatchResult: neg.hasMatchResult,
//             matchRevealed: neg.matchRevealed,
//             meetingPoint: neg.decryptedMeetingPoint
//         });
//     }

//     /**
//      * @notice Get all negotiations for a user
//      * @param user User address
//      * @return negotiationIds Array of negotiation IDs
//      */
//     function getUserNegotiations(address user)
//         external
//         view
//         returns (uint256[] memory)
//     {
//         return userNegotiations[user];
//     }

//     /**
//      * @notice Check if user is part of negotiation
//      * @param negotiationId The negotiation ID
//      * @param user User address
//      * @return isParticipant Whether user is employer or candidate
//      */
//     function isParticipant(uint256 negotiationId, address user)
//         external
//         view
//         returns (bool)
//     {
//         require(negotiationId < negotiationCounter, "Negotiation does not exist");
//         Negotiation storage neg = negotiations[negotiationId];
//         return (user == neg.employer || user == neg.candidate);
//     }

//     /**
//      * @notice Get negotiation state
//      * @param negotiationId The negotiation ID
//      * @return state Current state
//      */
//     function getNegotiationState(uint256 negotiationId)
//         external
//         view
//         returns (NegotiationState)
//     {
//         require(negotiationId < negotiationCounter, "Negotiation does not exist");
//         return negotiations[negotiationId].state;
//     }

//     /**
//      * @notice Check if negotiation has revealed match result
//      * @param negotiationId The negotiation ID
//      * @return hasMatch Whether ranges overlap
//      * @return meetingPoint The meeting point (0 if no match)
//      */
//     function getMatchResult(uint256 negotiationId)
//         external
//         view
//         returns (bool hasMatch, uint64 meetingPoint)
//     {
//         require(negotiationId < negotiationCounter, "Negotiation does not exist");
//         Negotiation storage neg = negotiations[negotiationId];
//         require(neg.matchRevealed, "Match not yet revealed");
        
//         return (neg.hasMatchResult, neg.decryptedMeetingPoint);
//     }

//     /**
//      * @notice Get total number of negotiations
//      * @return count Total negotiations count
//      */
//     function getTotalNegotiations() external view returns (uint256) {
//         return negotiationCounter;
//     }

//     /**
//      * @notice Get callback debug information
//      * @param negotiationId The negotiation ID
//      * @return isPending Whether waiting for decryption
//      * @return requestId Latest request ID
//      * @return lastError Last error message
//      */
//     function getCallbackDebugInfo(uint256 negotiationId)
//         external
//         view
//         returns (
//             bool isPending,
//             uint256 requestId,
//             string memory lastError
//         )
//     {
//         return (
//             isDecryptionPending[negotiationId],
//             latestRequestId[negotiationId],
//             lastCallbackError[negotiationId]
//         );
//     }

//     /**
//      * @notice Check if negotiation is expired
//      * @param negotiationId The negotiation ID
//      * @return expired Whether deadline has passed
//      */
//     function isExpired(uint256 negotiationId) external view returns (bool) {
//         require(negotiationId < negotiationCounter, "Negotiation does not exist");
//         return block.timestamp >= negotiations[negotiationId].deadline;
//     }
// }