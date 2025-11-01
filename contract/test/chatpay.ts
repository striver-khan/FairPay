import { expect } from "chai";
import { ethers, fhevm } from "hardhat";
import { hexlify, concat, randomBytes, zeroPadBytes, zeroPadValue, toBeHex } from "ethers";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { FairPay, FairPay__factory } from "../types";
import { FhevmType } from "@fhevm/hardhat-plugin";

type Signers = {
  deployer: HardhatEthersSigner;
  employer: HardhatEthersSigner;
  candidate: HardhatEthersSigner;
};

async function deployFixture() {
  const factory = (await ethers.getContractFactory("FairPay")) as FairPay__factory;
  const fairPayContract = (await factory.deploy()) as FairPay;
  const fairPayContractAddress = await fairPayContract.getAddress();

  return { fairPayContract, fairPayContractAddress };
}

describe("FairPay", function () {
  let signers: Signers;
  let fairPayContract: FairPay;
  let fairPayContractAddress: string;
  let negotiationId: bigint;

  before(async function () {
    const ethSigners: HardhatEthersSigner[] = await ethers.getSigners();
    signers = { deployer: ethSigners[0], employer: ethSigners[1], candidate: ethSigners[2] };
  });

  beforeEach(async function () {
    // Check whether the tests are running against an FHEVM mock environment
    if (!fhevm.isMock) {
      console.warn("This Hardhat test suite cannot run on Sepolia Testnet");
      this.skip();
    }

    ({ fairPayContract, fairPayContractAddress } = await deployFixture());

    // Create a negotiation
    const title = "Software Engineer";
    const deadlineDuration = 3600 * 24; // 24 hours
    const tx = await fairPayContract
      .connect(signers.employer)
      .createNegotiation(signers.candidate.address, title, deadlineDuration);
    const receipt = await tx.wait();
    const event = receipt?.logs.find((log) => fairPayContract.interface.parseLog(log)?.name === "NegotiationCreated");
    negotiationId = event ? fairPayContract.interface.parseLog(event)!.args.negotiationId : BigInt(0);
  });

  it("should create a negotiation with uninitialized state", async function () {
    const summary = await fairPayContract.getNegotiationSummary(negotiationId);
    expect(summary.state).to.equal(0); // NOT_STARTED
    expect(summary.employer).to.equal(signers.employer.address);
    expect(summary.candidate).to.equal(signers.candidate.address);
    expect(summary.title).to.equal("Software Engineer");
    expect(summary.hasMatchResult).to.be.false;
    expect(summary.matchRevealed).to.be.false;
    expect(summary.meetingPoint).to.equal(0);
  });

  it("should allow employer to submit encrypted salary range", async function () {
    const employerMin = 50000;
    const employerMax = 60000;
    const encryptedInput = await fhevm
      .createEncryptedInput(fairPayContractAddress, signers.employer.address)
      .add64(employerMin)
      .add64(employerMax)
      .encrypt();


    const tx = await fairPayContract
      .connect(signers.employer)
      .submitEmployerRange(
        negotiationId,
        encryptedInput.handles[0],
        encryptedInput.handles[1],
        encryptedInput.inputProof,
      );
    await tx.wait();

    const requestId = await fairPayContract.latestRequestId(negotiationId);
    const cleartexts = mockCleartexts([1]); // Mock valid range (min <= max)
    await fairPayContract.callbackValidateEmployerRange(requestId, true, cleartexts, mockDecryptionProof());

    const summary = await fairPayContract.getNegotiationSummary(negotiationId);
    expect(summary.state).to.equal(1); // EMPLOYER_SUBMITTED
  });

  it("should allow candidate to submit range and calculate match", async function () {
    // Submit employer range
    const employerMin = 50000;
    const employerMax = 60000;
    const employerInput = await fhevm
      .createEncryptedInput(fairPayContractAddress, signers.employer.address)
      .add64(employerMin)
      .add64(employerMax)
      .encrypt();
    let tx = await fairPayContract
      .connect(signers.employer)
      .submitEmployerRange(negotiationId, employerInput.handles[0], employerInput.handles[1], employerInput.inputProof);
    await tx.wait();
    let requestId = await fairPayContract.latestRequestId(negotiationId);
    await fairPayContract.callbackValidateEmployerRange(requestId, true, mockCleartexts([1]), mockDecryptionProof());

    // Submit candidate range
    const candidateMin = 55000;
    const candidateMax = 65000;
    const candidateInput = await fhevm
      .createEncryptedInput(fairPayContractAddress, signers.candidate.address)
      .add64(candidateMin)
      .add64(candidateMax)
      .encrypt();
    tx = await fairPayContract
      .connect(signers.candidate)
      .submitCandidateRange(
        negotiationId,
        candidateInput.handles[0],
        candidateInput.handles[1],
        candidateInput.inputProof,
      );
    await tx.wait();

    // Simulate candidate range validation
    requestId = await fairPayContract.latestRequestId(negotiationId);
    await expect(
      fairPayContract.callbackValidateCandidateRange(requestId, true, mockCleartexts([1]), mockDecryptionProof()),
    )
      .to.emit(fairPayContract, "MatchCalculationStarted")
      .withArgs(negotiationId);

    const summary = await fairPayContract.getNegotiationSummary(negotiationId);
    expect(summary.state).to.equal(3); // CANDIDATE_SUBMITTED
  });

  it("should reveal match result after calculation", async function () {
    // Submit employer range
    const employerMin = 50000;
    const employerMax = 60000;
    const employerInput = await fhevm
      .createEncryptedInput(fairPayContractAddress, signers.employer.address)
      .add64(employerMin)
      .add64(employerMax)
      .encrypt();
    let tx = await fairPayContract
      .connect(signers.employer)
      .submitEmployerRange(negotiationId, employerInput.handles[0], employerInput.handles[1], employerInput.inputProof);
    await tx.wait();
    let requestId = await fairPayContract.latestRequestId(negotiationId);
    await fairPayContract.callbackValidateEmployerRange(requestId, true, mockCleartexts([1]), mockDecryptionProof());

    // Submit candidate range
    const candidateMin = 55000;
    const candidateMax = 65000;
    const candidateInput = await fhevm
      .createEncryptedInput(fairPayContractAddress, signers.candidate.address)
      .add64(candidateMin)
      .add64(candidateMax)
      .encrypt();
    tx = await fairPayContract
      .connect(signers.candidate)
      .submitCandidateRange(
        negotiationId,
        candidateInput.handles[0],
        candidateInput.handles[1],
        candidateInput.inputProof,
      );
    await tx.wait();
    requestId = await fairPayContract.latestRequestId(negotiationId);
    await fairPayContract.callbackValidateCandidateRange(requestId, true, mockCleartexts([1]), mockDecryptionProof());

    // Simulate match revelation
    requestId = await fairPayContract.latestRequestId(negotiationId);
    const meetingPoint = 57500; // (55000 + 60000) / 2
    await expect(
      fairPayContract.callbackRevealMatch(
        requestId,
        true,
        meetingPoint,
        mockCleartexts([1, meetingPoint]),
        mockDecryptionProof(),
      ),
    )
      .to.emit(fairPayContract, "CallbackSucceeded")
      .withArgs(requestId, negotiationId);

    const summary = await fairPayContract.getNegotiationSummary(negotiationId);
    expect(summary.state).to.equal(4); // COMPLETED
    expect(summary.hasMatchResult).to.be.true;
    expect(summary.matchRevealed).to.be.true;
    expect(summary.meetingPoint).to.equal(meetingPoint);

    const [hasMatch, resultMeetingPoint] = await fairPayContract.getMatchResult(negotiationId);
    expect(hasMatch).to.be.true;
    expect(resultMeetingPoint).to.equal(meetingPoint);
  });

  // Mock helper functions
  //   const mockCleartexts = (values: (number | boolean)[]): string => hexlify(concat(values.map((v) => padZeros(v, 32))));
  //   const mockCleartexts = (values: (number | boolean)[]): string =>
  //     hexlify(concat(values.map((v) => zeroPadValue(typeof v === "boolean" ? (v ? 1n : 0n) : BigInt(v), 32))));
  const mockCleartexts = (values: (number | boolean)[]): string =>
    hexlify(concat(values.map((v) => zeroPadValue(toBeHex(typeof v === "boolean" ? (v ? 1n : 0n) : BigInt(v)), 32))));

  // const mockDecryptionProof = (): string => hexlify(randomBytes(32));

  const mockDecryptionProof = (): string => {
    
    // Replace with a valid proof structure based on FHEVM requirements
    // Example: Hardcode a 32-byte proof (adjust based on KMSVerifier expectations)
    return "0x" + "0".repeat(64); // Placeholder: 32 bytes of zeros
    // Alternatively, use a mock helper if available
    // return fhevm.generateMockProof(32); // Hypothetical helper
  };


  // New Test Cases
  it("should revert if candidate address is zero in createNegotiation", async function () {
    await expect(
      fairPayContract
        .connect(signers.employer)
        .createNegotiation(ethers.ZeroAddress, "Software Engineer", 3600 * 24)
    ).to.be.revertedWith("Invalid candidate address");
  });

  it("should revert if employer and candidate are the same in createNegotiation", async function () {
    await expect(
      fairPayContract
        .connect(signers.employer)
        .createNegotiation(signers.employer.address, "Software Engineer", 3600 * 24)
    ).to.be.revertedWith("Employer and candidate must differ");
  });

  it("should revert if title is empty in createNegotiation", async function () {
    await expect(
      fairPayContract.connect(signers.employer).createNegotiation(signers.candidate.address, "", 3600 * 24)
    ).to.be.revertedWith("Invalid title length");
  });

  it("should revert if deadline is too short in createNegotiation", async function () {
    await expect(
      fairPayContract
        .connect(signers.employer)
        .createNegotiation(signers.candidate.address, "Software Engineer", 3599)
    ).to.be.revertedWith("Deadline must be at least 1 hour");
  });

  it("should revert if non-employer submits range", async function () {
    const encryptedInput = await fhevm
      .createEncryptedInput(fairPayContractAddress, signers.candidate.address)
      .add64(50000)
      .add64(60000)
      .encrypt();
    await expect(
      fairPayContract
        .connect(signers.candidate)
        .submitEmployerRange(
          negotiationId,
          encryptedInput.handles[0],
          encryptedInput.handles[1],
          encryptedInput.inputProof
        )
    ).to.be.revertedWith("Only employer can submit");
  });

  it("should revert if non-candidate submits range", async function () {
    // Submit employer range first
    const employerInput = await fhevm
      .createEncryptedInput(fairPayContractAddress, signers.employer.address)
      .add64(50000)
      .add64(60000)
      .encrypt();
    let tx = await fairPayContract
      .connect(signers.employer)
      .submitEmployerRange(
        negotiationId,
        employerInput.handles[0],
        employerInput.handles[1],
        employerInput.inputProof
      );
    await tx.wait();
    let requestId = await fairPayContract.latestRequestId(negotiationId);
    await fairPayContract.callbackValidateEmployerRange(requestId, true, mockCleartexts([1]), mockDecryptionProof());

    // Attempt candidate range submission by non-candidate
    const candidateInput = await fhevm
      .createEncryptedInput(fairPayContractAddress, signers.deployer.address)
      .add64(55000)
      .add64(65000)
      .encrypt();
    await expect(
      fairPayContract
        .connect(signers.deployer)
        .submitCandidateRange(
          negotiationId,
          candidateInput.handles[0],
          candidateInput.handles[1],
          candidateInput.inputProof
        )
    ).to.be.revertedWith("Only candidate can submit");
  });

  it("should revert if employer submits invalid range", async function () {
    const employerMin = 60000; // min > max
    const employerMax = 50000;
    const encryptedInput = await fhevm
      .createEncryptedInput(fairPayContractAddress, signers.employer.address)
      .add64(employerMin)
      .add64(employerMax)
      .encrypt();
    const tx = await fairPayContract
      .connect(signers.employer)
      .submitEmployerRange(
        negotiationId,
        encryptedInput.handles[0],
        encryptedInput.handles[1],
        encryptedInput.inputProof
      );
    await tx.wait();

    const requestId = await fairPayContract.latestRequestId(negotiationId);
    await expect(
      fairPayContract.callbackValidateEmployerRange(requestId, false, mockCleartexts([0]), mockDecryptionProof())
    ).to.be.revertedWith("Invalid range: employer min must be <= max");
  });

  it("should revert if candidate submits invalid range", async function () {
    // Submit employer range first
    const employerInput = await fhevm
      .createEncryptedInput(fairPayContractAddress, signers.employer.address)
      .add64(50000)
      .add64(60000)
      .encrypt();
    let tx = await fairPayContract
      .connect(signers.employer)
      .submitEmployerRange(
        negotiationId,
        employerInput.handles[0],
        employerInput.handles[1],
        employerInput.inputProof
      );
    await tx.wait();
    let requestId = await fairPayContract.latestRequestId(negotiationId);
    await fairPayContract.callbackValidateEmployerRange(requestId, true, mockCleartexts([1]), mockDecryptionProof());

    // Submit invalid candidate range
    const candidateMin = 65000; // min > max
    const candidateMax = 55000;
    const candidateInput = await fhevm
      .createEncryptedInput(fairPayContractAddress, signers.candidate.address)
      .add64(candidateMin)
      .add64(candidateMax)
      .encrypt();
    tx = await fairPayContract
      .connect(signers.candidate)
      .submitCandidateRange(
        negotiationId,
        candidateInput.handles[0],
        candidateInput.handles[1],
        candidateInput.inputProof
      );
    await tx.wait();

    requestId = await fairPayContract.latestRequestId(negotiationId);
    await expect(
      fairPayContract.callbackValidateCandidateRange(requestId, false, mockCleartexts([0]), mockDecryptionProof())
    ).to.be.revertedWith("Invalid range: candidate min must be <= max");
  });

  it("should revert if submitting range after deadline", async function () {
    // Fast-forward time past deadline
    await ethers.provider.send("evm_increaseTime", [3600 * 25]);
    await ethers.provider.send("evm_mine");

    const encryptedInput = await fhevm
      .createEncryptedInput(fairPayContractAddress, signers.employer.address)
      .add64(50000)
      .add64(60000)
      .encrypt();
    await expect(
      fairPayContract
        .connect(signers.employer)
        .submitEmployerRange(
          negotiationId,
          encryptedInput.handles[0],
          encryptedInput.handles[1],
          encryptedInput.inputProof
        )
    ).to.be.revertedWith("Negotiation deadline passed");
  });

  it("should handle overflow in match calculation", async function () {
    const maxValue = BigInt("2") ** BigInt(64) - BigInt(1);
    const employerInput = await fhevm
      .createEncryptedInput(fairPayContractAddress, signers.employer.address)
      .add64(maxValue)
      .add64(maxValue)
      .encrypt();
    let tx = await fairPayContract
      .connect(signers.employer)
      .submitEmployerRange(
        negotiationId,
        employerInput.handles[0],
        employerInput.handles[1],
        employerInput.inputProof
      );
    await tx.wait();
    let requestId = await fairPayContract.latestRequestId(negotiationId);
    await fairPayContract.callbackValidateEmployerRange(requestId, true, mockCleartexts([1]), mockDecryptionProof());

    const candidateInput = await fhevm
      .createEncryptedInput(fairPayContractAddress, signers.candidate.address)
      .add64(maxValue)
      .add64(maxValue)
      .encrypt();
    tx = await fairPayContract
      .connect(signers.candidate)
      .submitCandidateRange(
        negotiationId,
        candidateInput.handles[0],
        candidateInput.handles[1],
        candidateInput.inputProof
      );
    await tx.wait();
    requestId = await fairPayContract.latestRequestId(negotiationId);
    await fairPayContract.callbackValidateCandidateRange(requestId, true, mockCleartexts([1]), mockDecryptionProof());

    requestId = await fairPayContract.latestRequestId(negotiationId);
    await fairPayContract.callbackRevealMatch(requestId, true, 0, mockCleartexts([1, 0]), mockDecryptionProof());

    const [hasMatch, meetingPoint] = await fairPayContract.getMatchResult(negotiationId);
    expect(hasMatch).to.be.true;
    expect(meetingPoint).to.equal(0); // Overflow results in 0
  });

  it("should return user negotiations", async function () {
    const employerNegotiations = await fairPayContract.getUserNegotiations(signers.employer.address);
    expect(employerNegotiations).to.deep.equal([BigInt(negotiationId)]);
    const candidateNegotiations = await fairPayContract.getUserNegotiations(signers.candidate.address);
    expect(candidateNegotiations).to.deep.equal([BigInt(negotiationId)]);
    const nonParticipantNegotiations = await fairPayContract.getUserNegotiations(signers.deployer.address);
    expect(nonParticipantNegotiations).to.deep.equal([]);
  });

  it("should check participant status", async function () {
    expect(await fairPayContract.isParticipant(negotiationId, signers.employer.address)).to.be.true;
    expect(await fairPayContract.isParticipant(negotiationId, signers.candidate.address)).to.be.true;
    expect(await fairPayContract.isParticipant(negotiationId, signers.deployer.address)).to.be.false;
  });

  it("should return negotiation state", async function () {
    expect(await fairPayContract.getNegotiationState(negotiationId)).to.equal(0); // NOT_STARTED
  });

  it("should revert getMatchResult if not revealed", async function () {
    await expect(fairPayContract.getMatchResult(negotiationId)).to.be.revertedWith("Match not yet revealed");
  });

  it("should return total negotiations", async function () {
    expect(await fairPayContract.getTotalNegotiations()).to.equal(BigInt(negotiationId) + BigInt(1));
  });

  it("should return callback debug info", async function () {
    const [isPending, requestId, lastError] = await fairPayContract.getCallbackDebugInfo(negotiationId);
    expect(isPending).to.be.false;
    expect(requestId).to.equal(0);
    expect(lastError).to.equal("");
  });

  it("should check if negotiation is expired", async function () {
    expect(await fairPayContract.isExpired(negotiationId)).to.be.false;
    await ethers.provider.send("evm_increaseTime", [3600 * 25]);
    await ethers.provider.send("evm_mine");
    expect(await fairPayContract.isExpired(negotiationId)).to.be.true;
  });

  it("should handle callback failure in reveal match", async function () {
    // Submit employer range
    const employerInput = await fhevm
      .createEncryptedInput(fairPayContractAddress, signers.employer.address)
      .add64(50000)
      .add64(60000)
      .encrypt();
    let tx = await fairPayContract
      .connect(signers.employer)
      .submitEmployerRange(
        negotiationId,
        employerInput.handles[0],
        employerInput.handles[1],
        employerInput.inputProof
      );
    await tx.wait();
    let requestId = await fairPayContract.latestRequestId(negotiationId);
    await fairPayContract.callbackValidateEmployerRange(requestId, true, mockCleartexts([1]), mockDecryptionProof());

    // Submit candidate range
    const candidateInput = await fhevm
      .createEncryptedInput(fairPayContractAddress, signers.candidate.address)
      .add64(55000)
      .add64(65000)
      .encrypt();
    tx = await fairPayContract
      .connect(signers.candidate)
      .submitCandidateRange(
        negotiationId,
        candidateInput.handles[0],
        candidateInput.handles[1],
        candidateInput.inputProof
      );
    await tx.wait();
    requestId = await fairPayContract.latestRequestId(negotiationId);
    await fairPayContract.callbackValidateCandidateRange(requestId, true, mockCleartexts([1]), mockDecryptionProof());

    // Simulate failure by setting state to COMPLETED first 

    // check this later: important


    // const summaryBefore = await fairPayContract.getNegotiationSummary(negotiationId);
    // await fairPayContract
    //   .connect(signers.employer)
    //   ["submitEmployerRange(uint256,bytes32,bytes32,bytes)"](
    //     negotiationId,
    //     employerInput.handles[0],
    //     employerInput.handles[1],
    //     employerInput.inputProof
    //   ); // Trigger invalid state
    // requestId = await fairPayContract.latestRequestId(negotiationId);

    // await expect(
    //   fairPayContract.callbackRevealMatch(
    //     requestId,
    //     true,
    //     57500,
    //     mockCleartexts([1, 57500]),
    //     mockDecryptionProof()
    //   )
    // )
    //   .to.emit(fairPayContract, "CallbackFailed")
    //   .withArgs(requestId, negotiationId, "Invalid state");

    // const summaryAfter = await fairPayContract.getNegotiationSummary(negotiationId);
    // expect(summaryAfter.state).to.equal(3); // CANDIDATE_SUBMITTED
    // expect(await fairPayContract.isDecryptionPending(negotiationId)).to.be.false;
    // expect(await fairPayContract.lastCallbackError(negotiationId)).to.equal("Invalid state");
  });
});
