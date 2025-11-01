import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { ethers, fhevm, deployments } from "hardhat";
import { FairPay, FairPay__factory } from "../types";
import { expect } from "chai";
import { FhevmType } from "@fhevm/hardhat-plugin";

type Signers = {
  employer: HardhatEthersSigner;
  candidate: HardhatEthersSigner;
};

describe("FairPaySepolia", function () {
  let signers: Signers;
  let fairPayContract: FairPay;
  let fairPayContractAddress: string;
  let step: number;
  let steps: number;
  let negotiationId: bigint;

  function progress(message: string) {
    console.log(`${++step}/${steps} ${message}`);
  }

  before(async function () {
    if (fhevm.isMock) {
      console.warn(`This hardhat test suite can only run on Sepolia Testnet`);
      this.skip();
    }

    try {
      const FairPayDeployment = await deployments.get("FairPay");
      fairPayContractAddress = FairPayDeployment.address;
      fairPayContract = await ethers.getContractAt("FairPay", FairPayDeployment.address);
    } catch (e) {
      (e as Error).message += ". Call 'npx hardhat deploy --network sepolia'";
      throw e;
    }

    const ethSigners: HardhatEthersSigner[] = await ethers.getSigners();
    signers = { employer: ethSigners[0], candidate: ethSigners[1] };
  });

  beforeEach(async () => {
    step = 0;
    steps = 0;

    // Create a negotiation
    steps = 3;
    progress("Creating negotiation...");
    const title = "Software Engineer";
    const deadlineDuration = 3600 * 24; // 24 hours
    const tx = await fairPayContract
      .connect(signers.employer)
      .createNegotiation(signers.candidate.address, title, deadlineDuration);
    const receipt = await tx.wait();
    const event = receipt?.logs.find((log) => fairPayContract.interface.parseLog(log)?.name === "NegotiationCreated");
    negotiationId = event ? fairPayContract.interface.parseLog(event)!.args.negotiationId : BigInt(0);
    progress(`Negotiation created with ID: ${negotiationId}`);
  });

  it("should create a negotiation with uninitialized state", async function () {
    steps = 2;
    this.timeout(4 * 40000);

    progress("Fetching negotiation summary...");
    const summary = await fairPayContract.getNegotiationSummary(negotiationId);
    progress("Verifying negotiation summary...");

    expect(summary.state).to.equal(0); // NOT_STARTED
    expect(summary.employer).to.equal(signers.employer.address);
    expect(summary.candidate).to.equal(signers.candidate.address);
    expect(summary.title).to.equal("Software Engineer");
    expect(summary.hasMatchResult).to.be.false;
    expect(summary.matchRevealed).to.be.false;
    expect(summary.meetingPoint).to.equal(0);
  });

  it("should allow employer to submit encrypted salary range", async function () {
    steps = 6;
    this.timeout(4 * 40000);

    progress("Encrypting employer salary range (min: 50000, max: 60000)...");
    const employerMin = 50000;
    const employerMax = 60000;
    const encryptedInput = await fhevm
      .createEncryptedInput(fairPayContractAddress, signers.employer.address)
      .add64(employerMin)
      .add64(employerMax)
      .encrypt();

    progress(
      `Submitting employer range for negotiation ID ${negotiationId} with handles ${ethers.hexlify(
        encryptedInput.handles[0],
      )}, ${ethers.hexlify(encryptedInput.handles[1])}...`,
    );
    const tx = await fairPayContract
      .connect(signers.employer)
      .submitEmployerRange(
        negotiationId,
        encryptedInput.handles[0],
        encryptedInput.handles[1],
        encryptedInput.inputProof,
      );
    await tx.wait();
    progress("Employer range submitted, waiting for callback...");

    progress("Fetching latest request ID...");
    const requestId = await fairPayContract.latestRequestId(negotiationId);
    expect(requestId).to.not.equal(0);

    progress("Checking decryption pending status...");
    expect(await fairPayContract.isDecryptionPending(negotiationId)).to.be.true;

    progress("Fetching negotiation summary...");
    const summary = await fairPayContract.getNegotiationSummary(negotiationId);
    expect(summary.state).to.equal(1); // EMPLOYER_SUBMITTED
  });

  it("should allow candidate to submit range and calculate match", async function () {
    steps = 10;
    this.timeout(6 * 40000);

    // Submit employer range
    progress("Encrypting employer salary range (min: 50000, max: 60000)...");
    const employerMin = 50000;
    const employerMax = 60000;
    const employerInput = await fhevm
      .createEncryptedInput(fairPayContractAddress, signers.employer.address)
      .add64(employerMin)
      .add64(employerMax)
      .encrypt();
    progress(
      `Submitting employer range for negotiation ID ${negotiationId} with handles ${ethers.hexlify(
        employerInput.handles[0],
      )}, ${ethers.hexlify(employerInput.handles[1])}...`,
    );
    let tx = await fairPayContract
      .connect(signers.employer)
      .submitEmployerRange(
        negotiationId,
        employerInput.handles[0],
        employerInput.handles[1],
        employerInput.inputProof,
      );
    await tx.wait();
    progress("Employer range submitted, waiting for callback...");

    progress("Checking employer submission status...");
    const summaryAfterEmployer = await fairPayContract.getNegotiationSummary(negotiationId);
    expect(summaryAfterEmployer.state).to.equal(1); // EMPLOYER_SUBMITTED

    // Submit candidate range
    progress("Encrypting candidate salary range (min: 55000, max: 65000)...");
    const candidateMin = 55000;
    const candidateMax = 65000;
    const candidateInput = await fhevm
      .createEncryptedInput(fairPayContractAddress, signers.candidate.address)
      .add64(candidateMin)
      .add64(candidateMax)
      .encrypt();
    progress(
      `Submitting candidate range for negotiation ID ${negotiationId} with handles ${ethers.hexlify(
        candidateInput.handles[0],
      )}, ${ethers.hexlify(candidateInput.handles[1])}...`,
    );
    tx = await fairPayContract
      .connect(signers.candidate)
      .submitCandidateRange(
        negotiationId,
        candidateInput.handles[0],
        candidateInput.handles[1],
        candidateInput.inputProof,
      );
    await tx.wait();
    progress("Candidate range submitted, waiting for callback...");

    progress("Checking candidate submission status...");
    const requestId = await fairPayContract.latestRequestId(negotiationId);
    expect(requestId).to.not.equal(0);

    progress("Fetching negotiation summary...");
    const summary = await fairPayContract.getNegotiationSummary(negotiationId);
    expect(summary.state).to.equal(3); // CANDIDATE_SUBMITTED

    progress("Checking for match calculation event...");
    const receipt = await tx.wait();
    const event = receipt?.logs.find((log) => fairPayContract.interface.parseLog(log)?.name === "MatchCalculationStarted");
    expect(event).to.not.be.undefined;
  });

  it("should revert if candidate submits range before employer", async function () {
    steps = 4;
    this.timeout(4 * 40000);

    progress("Encrypting candidate salary range (min: 55000, max: 65000)...");
    const candidateMin = 55000;
    const candidateMax = 65000;
    const candidateInput = await fhevm
      .createEncryptedInput(fairPayContractAddress, signers.candidate.address)
      .add64(candidateMin)
      .add64(candidateMax)
      .encrypt();

    progress(
      `Attempting to submit candidate range for negotiation ID ${negotiationId} before employer...`,
    );
    await expect(
      fairPayContract
        .connect(signers.candidate)
        .submitCandidateRange(
          negotiationId,
          candidateInput.handles[0],
          candidateInput.handles[1],
          candidateInput.inputProof,
        ),
    ).to.be.revertedWith("Employer must submit first");
    progress("Candidate range submission correctly reverted.");

    progress("Verifying negotiation state remains unchanged...");
    const summary = await fairPayContract.getNegotiationSummary(negotiationId);
    expect(summary.state).to.equal(0); // NOT_STARTED
  });

  it("should revert if submitting range after deadline", async function () {
    steps = 5;
    this.timeout(4 * 40000);

    progress("Fast-forwarding time past deadline (25 hours)...");
    await ethers.provider.send("evm_increaseTime", [3600 * 25]);
    await ethers.provider.send("evm_mine");

    progress("Encrypting employer salary range (min: 50000, max: 60000)...");
    const employerMin = 50000;
    const employerMax = 60000;
    const encryptedInput = await fhevm
      .createEncryptedInput(fairPayContractAddress, signers.employer.address)
      .add64(employerMin)
      .add64(employerMax)
      .encrypt();

    progress(
      `Attempting to submit employer range for negotiation ID ${negotiationId} after deadline...`,
    );
    await expect(
      fairPayContract
        .connect(signers.employer)
        .submitEmployerRange(
          negotiationId,
          encryptedInput.handles[0],
          encryptedInput.handles[1],
          encryptedInput.inputProof,
        ),
    ).to.be.revertedWith("Negotiation deadline passed");
    progress("Employer range submission correctly reverted.");

    progress("Verifying negotiation state remains unchanged...");
    const summary = await fairPayContract.getNegotiationSummary(negotiationId);
    expect(summary.state).to.equal(0); // NOT_STARTED
  });
});