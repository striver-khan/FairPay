import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { WalletService } from './wallet.service';
import { Negotiation } from '../../models/negotiation'; 
import { environment } from '../../environments/environment';
import abi from '../../assets/FairPay.json'
import { FheService1 } from './fhe.servicecopy';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private contract: ethers.Contract | null = null;

  constructor(private walletService: WalletService, private fheService: FheService1) {}

  initialize(contractAddress: string, rpcUrl: string): void {
    // const provider = new ethers.JsonRpcProvider(rpcUrl);
    if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.BrowserProvider(window.ethereum);
    // this.contract = new ethers.Contract(environment.contractAddress, ABI, provider);
    this.contract = new ethers.Contract(environment.contractAddress, abi.abi, provider);
  } else {
    throw new Error('Install MetaMask');
  }

  }

  private getSignedContract(): ethers.Contract {
    if (!this.contract) throw new Error('Contract not initialized');
    const signer = this.walletService.getSigner();
    return this.contract.connect(signer) as ethers.Contract;
  }

  async createNegotiation(
    candidate: string,
    title: string,
    deadlineHours: number
  ): Promise<{ id: number; txHash: string }> {
    const contract = this.getSignedContract();
    const deadlineSeconds = deadlineHours * 3600;

      const tx = await contract['createNegotiation'](
        candidate,
        title,
        deadlineSeconds
      );

    const receipt = await tx.wait();

    // Parse event
    let negotiationId = 0;
    for (const log of receipt.logs) {
      try {
        const parsed = contract.interface.parseLog({
          topics: log.topics as string[],
          data: log.data
        });
        if (parsed?.name === 'NegotiationCreated') {
          negotiationId = Number(parsed.args[0]);
          break;
        }
      } catch (e) {
        continue;
      }
    }

    return { id: negotiationId, txHash: receipt.hash };
  }

  async submitEmployerRange(
    negotiationId: number,
    encryptedMin: any,
    encryptedMax: any,
    proof: any
  ): Promise<string> {
    console.log(1, "contract");
    const contract = this.getSignedContract();

    console.log(2, "contract");
    const tx = await contract['submitEmployerRange'](
      negotiationId,
      encryptedMin,
      encryptedMax,
      proof
    );
    
    console.log(3, "contract");
    

    const receipt = await tx.wait();
    console.log(4, "contract");

    return receipt.hash;
  }

  async submitCandidateRange(
  negotiationId: number,
  encryptedMin: any,
  encryptedMax: any,
  proof: any
): Promise<string> {
  const contract = this.getSignedContract();

  // In contract.service.ts → submitCandidateRange
const minHex = ethers.hexlify(encryptedMin);
const maxHex = ethers.hexlify(encryptedMax);

const tx = await contract["submitCandidateRange"](
  negotiationId,
  encryptedMin,
  encryptedMax,
  proof
);
  

  const receipt = await tx.wait();
  return receipt.hash;
}

  async getNegotiationOld(id: number): Promise<Negotiation> {
    if (!this.contract) throw new Error('Contract not initialized');

    const result = await this.contract['getNegotiationSummary'](id);

    return {
      negotiationId: Number(result.negotiationId),
      employer: result.employer,
      candidate: result.candidate,
      title: result.title,
      state: Number(result.state),
      createdAt: Number(result.createdAt),
      deadline: Number(result.deadline),
      hasMatchResult: result.hasMatchResult,
      matchRevealed: result.matchRevealed,
      meetingPoint: Number(result.meetingPoint)
    };
  }

  async getNegotiation(id: number): Promise<Negotiation> {
  if (!this.contract) throw new Error('Contract not initialized');
  
  const raw = await this.contract["negotiations"](id);
  
  const negotiation: Negotiation = {
    negotiationId: Number(raw.negotiationId),
    employer: raw.employer,
    candidate: raw.candidate,
    title: raw.title,
    state: Number(raw.state),
    createdAt: Number(raw.createdAt),
    deadline: Number(raw.deadline),
    hasMatchResult: raw.hasMatchResult || false,
    matchRevealed: raw.matchRevealed || (Number(raw.state) === 4),
    meetingPoint: Number(raw.decryptedMeetingPoint || 0)
  };
  
  // If in MATCH_READY state, include the encrypted handles
  if (Number(raw.state) === 3) {
    negotiation.hasMatchHandle = raw.hasMatch;
    negotiation.meetingPointHandle = raw.meetingPoint;
    
    console.log('Loaded handles:', {
      hasMatch: negotiation.hasMatchHandle,
      meetingPoint: negotiation.meetingPointHandle
    });
  }
  
  // If completed, try to get the revealed result
  if (Number(raw.state) === 4) {
    negotiation.hasMatchResult = raw.hasMatchResult;
    negotiation.meetingPoint = Number(raw.decryptedMeetingPoint);
  }
  
  return negotiation;
}

  async getUserNegotiations(address: string): Promise<number[]> {
    if (!this.contract) throw new Error('Contract not initialized');

    const ids = await this.contract['getUserNegotiations'](address);
    return ids.map((id: bigint) => Number(id));
  }


// Replace your revealMatch method in contract.service.ts with this:

async revealMatch(
  negotiationId: number,
  hasMatch: boolean,
  meetingPoint: bigint | number,
): Promise<string> {
  const contract = this.getSignedContract();
  
  console.log('=== Calling revealMatch ===');
  console.log('Parameters:', {
    negotiationId,
    hasMatch,
    meetingPoint: meetingPoint.toString(),
  });
  
  // Ensure meetingPoint is a proper uint64
  const meetingPointUint64 = typeof meetingPoint === 'bigint' 
    ? meetingPoint 
    : BigInt(meetingPoint);
  
  // Ensure proof is properly formatted
  // const formattedProof = proof.startsWith('0x') ? proof : `0x${proof}`;
  
  try {
    const tx = await contract['revealMatch'](
      negotiationId,
      hasMatch,
      meetingPointUint64,
      {
        gasLimit: 500000
      }
    );
    
    console.log('Transaction sent:', tx.hash);
    const receipt = await tx.wait();
    console.log('Transaction confirmed:', receipt.hash);
    
    return receipt.hash;
  } catch (error: any) {
    console.error('revealMatch transaction failed:', error);
    
    // Try to extract revert reason
    if (error.reason) {
      throw new Error(`Contract reverted: ${error.reason}`);
    }
    if (error.message) {
      throw new Error(error.message);
    }
    throw error;
  }
}

  async revealMatchGrok(negotiationId: number): Promise<void> {
  if (!this.contract) throw new Error('Contract not initialized');

  await this.fheService.initialize1(); // ensure ready

  const contract = this.getSignedContract();
  const neg = await contract["negotiations"](negotiationId);

  // Make sure we're in the right state
  if (Number(neg.state) !== 3) {
    throw new Error('Match not ready yet');
  }

  const handles = [neg.hasMatch, neg.meetingPoint]; // both are bytes32 strings

  const requestId = Date.now();

  const { plaintexts, proof } = await this.fheService.decryptAndGetProof(handles, requestId);

  const [hasMatch, meetingPoint] = plaintexts;

  const tx = await contract["revealMatch"](
    negotiationId,
    requestId,
    hasMatch as boolean,
    meetingPoint as bigint,
    proof
  );

  await tx.wait();
}



async getMatchHandles(negotiationId: number): Promise<{
  hasMatchHandle: string;
  meetingPointHandle: string;
}> {
  if (!this.contract) throw new Error('Contract not initialized');
  const result = await this.contract['getMatchHandles'](negotiationId);
  return {
    hasMatchHandle: result.hasMatchHandle || result[0],
    meetingPointHandle: result.meetingPointHandle || result[1]
  };
}

async getMatchHandlesWithStatus(negotiationId: number): Promise<{
  hasMatchHandle: string;
  meetingPointHandle: string;
  hasMatchMarked: boolean;
  meetingPointMarked: boolean;
}> {
  if (!this.contract) throw new Error('Contract not initialized');
  const result = await this.contract['getMatchHandlesWithStatus'](negotiationId);
  return {
    hasMatchHandle: result.hasMatchHandle || result[0],
    meetingPointHandle: result.meetingPointHandle || result[1],
    hasMatchMarked: result.hasMatchMarked || result[2],
    meetingPointMarked: result.meetingPointMarked || result[3]
  };
}

 

  async getMatchResult(id: number): Promise<{ hasMatch: boolean; meetingPoint: number }> {
    if (!this.contract) throw new Error('Contract not initialized');

    const result = await this.contract['getMatchResult'](id);
    console.log('Match result from contract:', result);
    return {
      hasMatch: result.hasMatch,
      meetingPoint: Number(result.meetingPoint)
    };
  }

  async isExpired(id: number): Promise<boolean> {
    if (!this.contract) throw new Error('Contract not initialized');
    return await this.contract['isExpired'](id); 
  }

  onMatchRevealed(callback: (id: number, hasMatch: boolean, meetingPoint: number) => void): void {
    if (!this.contract) return;

    this.contract.on('MatchRevealed', (id, hasMatch, meetingPoint) => {
      callback(Number(id), hasMatch, Number(meetingPoint));
    });
  }

  removeAllListeners(): void {
    if (this.contract) {
      this.contract.removeAllListeners();
    }
  }

  async calculateMatch(negotiationId: number): Promise<string> {
  const contract = this.getSignedContract();
  const tx = await contract["calculateMatch"](negotiationId, {
    gasLimit: 3000000
});
  const receipt = await tx.wait();
  return receipt.hash;
}




}