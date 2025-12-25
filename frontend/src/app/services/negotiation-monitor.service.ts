import { Injectable, NgZone } from '@angular/core';
import { ethers } from 'ethers';
import { BehaviorSubject, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { WalletService } from './wallet.service';
import { ContractService } from './contract.service';
import abi from '../../assets/FairPay.json';
import { environment } from '../../environments/environment';

export interface NegotiationProgress {
  negotiationId: number;
  employer: string;
  candidate: string;
  title: string;
  state: string;
  createdAt: number;
  deadline: number;
  hasMatchResult: boolean;
  matchRevealed: boolean;
  meetingPoint: number;
  isExpired: boolean;
  lastError?: string;
  isPending?: boolean;
}

@Injectable({ providedIn: 'root' })
export class NegotiationMonitorService {
  private provider!: ethers.BrowserProvider;
  private contract!: ethers.Contract;

  /** Map of negotiationId → BehaviorSubject<NegotiationProgress> */
  private negotiationSubjects = new Map<number, BehaviorSubject<NegotiationProgress>>();

  constructor(
    private ngZone: NgZone,
    private walletService: WalletService,
    private contractService: ContractService
  ) {}

  /** Initialize connection and event listeners */
  async initialize(): Promise<void> {
    if (typeof window.ethereum === 'undefined') throw new Error('MetaMask not found');

    this.provider = new ethers.BrowserProvider(window.ethereum);
    this.contract = new ethers.Contract(environment.contractAddress, abi.abi, this.provider);

    console.log('[NegotiationMonitor] initialized with contract', environment.contractAddress);

    this.subscribeToEvents();

    // Optional: periodic refresh of all known negotiations
    interval(30000).subscribe(() => this.refreshAllNegotiations());
  }

  /** Subscribe to blockchain events for live updates */
  private subscribeToEvents(): void {
    this.contract.on('NegotiationCreated', (id, employer, candidate, title, deadline) => {
      console.log('[Event] NegotiationCreated', id);
      this.updateNegotiation(Number(id));
    });

    this.contract.on('EmployerRangeSubmitted', (id) => {
      console.log('[Event] EmployerRangeSubmitted', id);
      this.updateNegotiation(Number(id));
    });

    this.contract.on('CandidateRangeSubmitted', (id) => {
      console.log('[Event] CandidateRangeSubmitted', id);
      this.updateNegotiation(Number(id));
    });

    this.contract.on('MatchCalculationStarted', (id) => {
      console.log('[Event] MatchCalculationStarted', id);
      this.updateNegotiation(Number(id));
    });

    this.contract.on('MatchRevealed', (id, hasMatch, meetingPoint) => {
      console.log('[Event] MatchRevealed', id, hasMatch, meetingPoint);
      this.updateNegotiation(Number(id));
    });

    this.contract.on('CallbackFailed', (requestId, negotiationId, reason) => {
      console.error('[Event] CallbackFailed', negotiationId, reason);
      this.updateNegotiation(Number(negotiationId));
    });
  }

  /** Watch a single negotiation by ID and expose an observable */
  watchNegotiation(id: number): BehaviorSubject<NegotiationProgress> {
    if (!this.negotiationSubjects.has(id)) {
      const subject = new BehaviorSubject<NegotiationProgress>({
        negotiationId: id,
        employer: '',
        candidate: '',
        title: '',
        state: 'Loading...',
        createdAt: 0,
        deadline: 0,
        hasMatchResult: false,
        matchRevealed: false,
        meetingPoint: 0,
        isExpired: false
      });

      this.negotiationSubjects.set(id, subject);
      this.updateNegotiation(id);
    }

    return this.negotiationSubjects.get(id)!;
  }

  /** Fetch latest data for one negotiation */
  async updateNegotiation(id: number): Promise<void> {
    try {
      const summary = await this.contractService.getNegotiation(id);
      const isExpired = await this.contractService.isExpired(id);
      const [, , lastError] = await this.contract['getCallbackDebugInfo'](id);

      const readableState = this.mapStateCode(summary.state);

      const progress: NegotiationProgress = {
        negotiationId: id,
        employer: summary.employer,
        candidate: summary.candidate,
        title: summary.title,
        state: readableState,
        createdAt: summary.createdAt,
        deadline: summary.deadline,
        hasMatchResult: summary.hasMatchResult,
        matchRevealed: summary.matchRevealed,
        meetingPoint: summary.meetingPoint,
        isExpired,
        lastError: lastError || ''
      };

      this.ngZone.run(() => {
        const subject = this.negotiationSubjects.get(id);
        if (subject) subject.next(progress);
      });
    } catch (err) {
      console.error(`[NegotiationMonitor] updateNegotiation(${id}) failed`, err);
    }
  }

  /** Refresh all active negotiations */
  async refreshAllNegotiations(): Promise<void> {
    for (const id of this.negotiationSubjects.keys()) {
      await this.updateNegotiation(id);
    }
  }

  /** Fetch all negotiations for a given address (once) */
  async loadUserNegotiations(address: string): Promise<number[]> {
    const ids = await this.contractService.getUserNegotiations(address);
    for (const id of ids) this.watchNegotiation(id);
    return ids;
  }

  /** Map enum index to readable state name */
  private mapStateCode(code: number): string {
    switch (code) {
      case 0: return 'NOT_STARTED';
      case 1: return 'EMPLOYER_SUBMITTED';
      case 2: return 'CANDIDATE_PENDING_VALIDATION';
      case 3: return 'CANDIDATE_SUBMITTED';
      case 4: return 'COMPLETED';
      default: return 'UNKNOWN';
    }
  }
}
