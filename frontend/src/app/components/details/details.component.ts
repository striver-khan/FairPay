

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { WalletService } from '../../services/wallet.service';
import { ContractService } from '../../services/contract.service';
import {
  Negotiation,
  NegotiationState,
  STATE_NAMES,
} from '../../../models/negotiation';
import { environment } from '../../../environments/environment';
import { FheService1 } from '../../services/fhe.servicecopy';
import { ethers } from 'ethers';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit, OnDestroy {
  negotiationId = 0;
  negotiation: Negotiation | null = null;
  loading = true;
  error: string | null = null;
  submitError: string | null = null;

  isEmployer = false;
  isCandidate = false;
  isExpired = false;
  timeRemaining = '';

  submitting = false;
  waitingForMatch = false;

  employerRange = { min: 10000, max: 100000 };
  candidateRange = { min: 0, max: 0 };

  matchResult: { hasMatch: boolean; meetingPoint: number } | null = null;
  

  private refreshSub?: Subscription;
  private timeSub?: Subscription;
  private eventSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private walletService: WalletService,
    private contractService: ContractService,
    private fheService1: FheService1
  ) {}

  async ngOnInit(): Promise<void> {
    this.negotiationId =  await Number(this.route.snapshot.paramMap.get('id'));
    await this.loadNegotiation();

    if (this.negotiation?.state === 3) {
    console.log('Match is ready - testing decryption flow...');
    await this.testDecryptionFlow();
  }
    
    console.log('Setup periodic refresh and event listeners');
    const handles = await this.contractService.getMatchHandles(this.negotiationId);
console.log('Handles:', handles);
const result = await this.fheService1.testDecryption(handles.hasMatchHandle);
console.log('Test result:', result);

    console.log("end")

    // Refresh every 10 seconds (optional)
    this.refreshSub = interval(10000).subscribe(() => {
      this.loadNegotiation();
    });

    // Update time every second
    this.timeSub = interval(1000).subscribe(() => {
      this.updateTime();
    });

    // Listen for match revealed events
    this.setupEventListener();
  }

  ngOnDestroy(): void {
    this.refreshSub?.unsubscribe();
    this.timeSub?.unsubscribe();
    this.contractService.removeAllListeners();
  }

  setupEventListener(): void {
    this.contractService.onMatchRevealed((id, hasMatch, meetingPoint) => {
      console.log('MatchRevealed event:', { id, hasMatch, meetingPoint });
      if (id === this.negotiationId) {
        this.matchResult = { hasMatch, meetingPoint };
        this.waitingForMatch = false;
        this.loadNegotiation();
      }
    });
  }

  async loadNegotiation(): Promise<void> {
    this.loading = true;
    this.error = null;

    try {
      console.log('Loading negotiation ID:', this.negotiationId);
      this.negotiation = await this.contractService.getNegotiation(
        this.negotiationId
      );

      const userAddress = this.walletService.getAddress();
      this.isEmployer =
        this.negotiation.employer.toLowerCase() === userAddress.toLowerCase();
      this.isCandidate =
        this.negotiation.candidate.toLowerCase() === userAddress.toLowerCase();

      this.isExpired = await this.contractService.isExpired(this.negotiationId);
      
      // Check if match is calculated but not yet revealed
      if (this.negotiation.state === 3) { // MATCH_CALCULATED
        this.waitingForMatch = true;
        console.log('Match calculated, waiting for callback to reveal results...');
      }
      
      // If completed, try to get match result
      if (this.negotiation.state === 4 && !this.matchResult) { // COMPLETED
        try {
          this.matchResult = await this.contractService.getMatchResult(this.negotiationId);
          this.waitingForMatch = false;
        } catch (err) {
          console.log('Match not yet revealed via callback');
        }
      }

      this.updateTime();
    } catch (err: any) {
      this.error = err.message || 'Failed to load negotiation';
    } finally {
      this.loading = false;
    }
  }

  async submitEmployerRange(): Promise<void> {
    try {
      await this.fheService1.initialize1();
      await this.fheService1.diagnoseContract(environment.contractAddress);
    } catch (error) {
      console.error('FHE init failed:', error);
      this.submitError = 'FHE initialization failed';
      return;
    }

    if (!this.negotiation || this.isExpired) return;

    if (this.employerRange.min > this.employerRange.max) {
      this.submitError = 'Min must be <= max';
      return;
    }

    this.submitting = true;
    this.submitError = null;

    try {
      const userAddress = this.walletService.getAddress();

      const encrypted = await this.fheService1.encryptRange(
        this.employerRange.min,
        this.employerRange.max,
        userAddress,
        environment.contractAddress
      );

      console.log('Encrypted data:', encrypted);

      await this.contractService.submitEmployerRange(
        this.negotiationId,
        encrypted.encryptedMin,
        encrypted.encryptedMax,
        encrypted.proof
      );

      console.log('Submitted employer range');
      await this.loadNegotiation();
    } catch (err: any) {
      this.submitError = err.message || 'Submit failed';
      console.error('Submit error:', err);
    } finally {
      this.submitting = false;
    }
  }

  async submitCandidateRange(): Promise<void> {
    try {
      await this.fheService1.initialize1();
      await this.fheService1.diagnoseContract(environment.contractAddress);
    } catch (error) {
      console.error('FHE init failed:', error);
      this.submitError = 'FHE initialization failed';
      return;
    }

    if (!this.negotiation || this.isExpired) return;

    if (this.candidateRange.min > this.candidateRange.max) {
      this.submitError = 'Min must be <= max';
      return;
    }

    this.submitting = true;
    this.submitError = null;

    try {
      const userAddress = this.walletService.getAddress();

      const encrypted = await this.fheService1.encryptRange(
        this.candidateRange.min,
        this.candidateRange.max,
        userAddress,
        environment.contractAddress
      );

      console.log('Encrypted data:', encrypted);

      await this.contractService.submitCandidateRange(
        this.negotiationId,
        encrypted.encryptedMin,
        encrypted.encryptedMax,
        encrypted.proof
      );

      console.log('Submitted candidate range');

      await this.contractService.calculateMatch(this.negotiationId);
console.log('Match calculated – waiting for MATCH_READY');
      
      // Show waiting message
      this.waitingForMatch = true;
      
      await this.loadNegotiation();
    } catch (err: any) {
      this.submitError = err.message || 'Submit failed';
      console.error('Submit error:', err);
    } finally {
      this.submitting = false;
    }
  }

  updateTime(): void {
    if (!this.negotiation) return;

    const now = Math.floor(Date.now() / 1000);
    const remaining = this.negotiation.deadline - now;

    if (remaining <= 0) {
      this.timeRemaining = 'Expired';
      return;
    }

    const days = Math.floor(remaining / 86400);
    const hours = Math.floor((remaining % 86400) / 3600);
    const minutes = Math.floor((remaining % 3600) / 60);

    if (days > 0) this.timeRemaining = `${days}d ${hours}h`;
    else if (hours > 0) this.timeRemaining = `${hours}h ${minutes}m`;
    else this.timeRemaining = `${minutes}m`;
  }

  // getStateName(state: NegotiationState): string {
  //   return STATE_NAMES[state] || 'Unknown';
  // }

  getStateName(state: number): string {
  const names = [
    'Not Started',
    'Employer Submitted',
    'Candidate Submitted',
    'Match Ready',     // ← this is state 3
    'Completed'
  ];
  return names[state] ?? 'Unknown';
}

  formatDate(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleString();
  }

  async refresh(): Promise<void> {
    await this.loadNegotiation();
  }

  goBack(): void {
    this.router.navigate(['/list']);
  }

  // Helper method to check if user can submit
  canEmployerSubmit(): boolean {
    return !!(
      this.negotiation &&
      this.isEmployer &&
      this.negotiation.state === 0 && // NOT_STARTED
      !this.isExpired &&
      !this.submitting
    );
  }

  canCandidateSubmit(): boolean {
    return !!(
      this.negotiation &&
      this.isCandidate &&
      this.negotiation.state === 1 && // EMPLOYER_SUBMITTED
      !this.isExpired &&
      !this.submitting
    );
  }

  isMatchReady(): boolean {
    return this.negotiation?.state === 4 && !!this.matchResult; // COMPLETED
  }


// Replace your reveal methods in details.component.ts with these simplified versions:

// Button handler - called when user clicks "Reveal Match Result"

// Simplified version without polling - just one attempt
// If it fails, user can click again
async calculateAndRevealMatch(): Promise<void> {
  console.log('calculateAndRevealMatch called');
  
  // If match is already calculated (state 3), just reveal it
  if (this.negotiation?.state === 3) {
    console.log('Match already calculated, calling reveal...');
    await this.revealResult();
    return;
  }
  
  // Otherwise, we shouldn't be here
  console.log('Match not calculated yet, state:', this.negotiation?.state);
  this.submitError = 'Match not ready. Please ensure both parties have submitted ranges.';
}




public decryptionAttempts = 0;
public decryptionProgress = '';
public readonly maxDecryptionAttempts = 20;
public readonly decryptionInterval = 5000;
calculatingMatch = false;

// Main flow: Calculate and reveal


// Poll until values are decrypted, then reveal
private async pollForDecryptionAndReveal(): Promise<void> {
    this.decryptionAttempts++;
    
    console.log(`Decryption attempt ${this.decryptionAttempts}/${this.maxDecryptionAttempts}`);
    
    try {
      // Get encrypted handles from contract
      const handles = await this.contractService.getMatchHandles(this.negotiationId);
      
      console.log('Got handles:', handles);
      
      // Generate requestId (use timestamp)
      const requestId = Date.now();
      
      // Try to decrypt
      const decrypted = await this.fheService1.decryptMatchResults(
        handles.hasMatchHandle,
        handles.meetingPointHandle,
        requestId
      );
      
      console.log('✓ Decryption successful!');
      console.log('  Has match:', decrypted.hasMatch);
      console.log('  Meeting point:', decrypted.meetingPoint.toString());
      
      // Encode plaintexts as required by contract
      const cleartexts = ethers.AbiCoder.defaultAbiCoder().encode(
        ['bool', 'uint64'],
        [decrypted.hasMatch, decrypted.meetingPoint]
      );
      
      console.log('Step 3: Calling revealMatch...');
      
      // Call revealMatch with decrypted values
      const revealTx = await this.contractService.revealMatch(
        this.negotiationId,
        // requestId,
        decrypted.hasMatch,
        decrypted.meetingPoint,
        // cleartexts,
        // decrypted.proof
      );
      
      console.log('✓ Match revealed! tx:', revealTx);
      
      // Success!
      this.calculatingMatch = false;
      this.waitingForMatch = false;
      await this.loadNegotiation();
      
      // return true;
      
    } catch (err: any) {
      console.log('Decryption not ready:', err.message);
      // return false;
    }
  };


  // Replace your revealResult in details.component.ts with this version that includes retry:

private readonly decryptionRetryDelay = 15000; // 15 seconds between attempts

async revealResult(): Promise<void> {
  if (this.submitting || !this.negotiation || this.negotiation.state !== 3) {
    console.log('Cannot reveal:', { 
      submitting: this.submitting, 
      hasNegotiation: !!this.negotiation, 
      state: this.negotiation?.state 
    });
    return;
  }
  
  console.log('=== Starting Reveal Process ===');
  this.submitting = true;
  this.submitError = null;
  this.decryptionProgress = 'Initializing...';
  this.decryptionAttempts = 0;
  
  try {
    // Step 1: Get handles
    this.decryptionProgress = 'Getting encrypted handles...';
    const handles = await this.contractService.getMatchHandles(this.negotiationId);
    console.log('✓ Got handles:', handles);
    
    // Verify handles are valid
    const zeroHandle = '0x0000000000000000000000000000000000000000000000000000000000000000';
    if (handles.hasMatchHandle === zeroHandle || handles.meetingPointHandle === zeroHandle) {
      throw new Error('Invalid handles - match may not be calculated yet');
    }
    
    // Step 2: Check if marked (diagnostic)
    this.decryptionProgress = 'Verifying decryption status...';
    try {
      const status = await this.contractService.getMatchHandlesWithStatus(this.negotiationId);
      console.log('Decryption status:', status);
      
      if (!status.hasMatchMarked || !status.meetingPointMarked) {
        throw new Error('Values not marked for public decryption in contract');
      }
      console.log('✅ Values confirmed marked');
    } catch (statusError: any) {
      console.warn('Could not verify status:', statusError.message);
    }
    
    // Step 3: Try decryption with retry logic
    const requestId = Date.now();
    const decrypted = await this.attemptDecryptionWithRetry(
      handles.hasMatchHandle,
      handles.meetingPointHandle,
      requestId
    );
    
    console.log('✅ Decryption successful!');
    console.log('Result:', decrypted);
    
    // Step 4: Prepare and submit to contract
    this.decryptionProgress = 'Submitting to blockchain...';
    
    const cleartexts = ethers.AbiCoder.defaultAbiCoder().encode(
      ['bool', 'uint64'],
      [decrypted.hasMatch, decrypted.meetingPoint]
    );
    
    const revealTx = await this.contractService.revealMatch(
      this.negotiationId,
      // requestId,
      decrypted.hasMatch,
      decrypted.meetingPoint,
      // cleartexts,
      // decrypted.proof
    );
    
    console.log('✅ Match revealed! Tx:', revealTx);
    this.decryptionProgress = 'Success!';
    
    // Wait and reload
    await new Promise(resolve => setTimeout(resolve, 2000));
    await this.loadNegotiation();
    
  } catch (err: any) {
    console.error('=== Reveal Failed ===', err);
    this.handleRevealError(err);
  } finally {
    this.submitting = false;
  }
}

// Retry logic for decryption
private async attemptDecryptionWithRetry(
  hasMatchHandle: string,
  meetingPointHandle: string,
  requestId: number
): Promise<{ hasMatch: boolean; meetingPoint: bigint; proof: string }> {
  
  while (this.decryptionAttempts < this.maxDecryptionAttempts) {
    this.decryptionAttempts++;
    
    const attemptMsg = `Decrypting... (attempt ${this.decryptionAttempts}/${this.maxDecryptionAttempts})`;
    this.decryptionProgress = attemptMsg;
    console.log(attemptMsg);
    
    try {
      const decrypted = await this.fheService1.decryptMatchResults(
        hasMatchHandle,
        meetingPointHandle,
        requestId
      );
      
      // Success!
      return decrypted;
      
    } catch (error: any) {
      console.log(`Attempt ${this.decryptionAttempts} failed:`, error.message);
      
      // Check if it's a "not ready" error
      const isNotReady = 
        error.message?.includes('not ready') ||
        error.message?.includes('not available') ||
        error.message?.includes('pending') ||
        error.message?.includes('wait') ||
        error.message?.includes('processing');
      
      if (isNotReady && this.decryptionAttempts < this.maxDecryptionAttempts) {
        // Wait and retry
        const waitSeconds = this.decryptionRetryDelay / 1000;
        this.decryptionProgress = `Decryption not ready yet. Waiting ${waitSeconds}s before retry ${this.decryptionAttempts + 1}...`;
        console.log(`Waiting ${waitSeconds}s before retry...`);
        
        await new Promise(resolve => setTimeout(resolve, this.decryptionRetryDelay));
        continue; // Retry
      }
      
      // Not a "not ready" error, or max attempts reached
      throw error;
    }
  }
  
  // Max attempts reached
  throw new Error(
    `Decryption timed out after ${this.maxDecryptionAttempts} attempts. ` +
    `The Zama gateway may be slow. Please try again in a few minutes.`
  );
}

// Error handler
private handleRevealError(err: any): void {
  if (err.message?.includes('not ready') || err.message?.includes('not available')) {
    this.submitError = 'Decryption not ready. The Zama gateway needs more time to process. Please wait 2-3 minutes and try again.';
  } else if (err.message?.includes('not marked')) {
    this.submitError = 'Contract error: Values not marked for decryption. Please contact support.';
  } else if (err.message?.includes('invalid handles')) {
    this.submitError = 'Invalid encryption handles. Ensure match was calculated correctly.';
  } else if (err.message?.includes('timed out')) {
    this.submitError = err.message;
  } else if (err.message?.includes('network') || err.message?.includes('gateway')) {
    this.submitError = 'Network error. Please check your connection and try again.';
  } else if (err.message?.includes('revert')) {
    this.submitError = `Contract error: ${err.message}`;
  } else {
    this.submitError = err.message || 'Reveal failed. Please try again.';
  }
  
  this.decryptionProgress = '';
}

async testDecryptionFlow(): Promise<void> {
  console.log('=== Testing Decryption Flow ===');
  
  try {
    // Step 1: Get handles
    console.log('Step 1: Getting handles...');
    const handles = await this.contractService.getMatchHandles(this.negotiationId);
    console.log('✓ Handles:', handles);
    
    // Step 2: Check if marked
    console.log('\nStep 2: Checking if marked for decryption...');
    try {
      const status = await this.contractService.getMatchHandlesWithStatus(this.negotiationId);
      console.log('✓ Status:', status);
      
      if (!status.hasMatchMarked) {
        console.error('❌ hasMatch is NOT marked for decryption!');
      } else {
        console.log('✅ hasMatch is marked for decryption');
      }
      
      if (!status.meetingPointMarked) {
        console.error('❌ meetingPoint is NOT marked for decryption!');
      } else {
        console.log('✅ meetingPoint is marked for decryption');
      }
    } catch (e: any) {
      console.warn('Could not check status:', e.message);
    }
    
    // Step 3: Test single handle decryption
    console.log('\nStep 3: Testing single handle decryption...');
    try {
      const result1 = await this.fheService1.testDecryption(handles.hasMatchHandle);
      console.log('✓ hasMatch decrypted:', result1);
    } catch (e: any) {
      console.error('❌ Single handle test failed:', e.message);
    }
    
    // Step 4: Test batch decryption
    console.log('\nStep 4: Testing batch decryption...');
    const requestId = Date.now();
    const decrypted = await this.fheService1.decryptMatchResults(
      handles.hasMatchHandle,
      handles.meetingPointHandle,
      requestId
    );
    
    console.log('✅ Batch decryption successful!');
    console.log('  Has match:', decrypted.hasMatch);
    console.log('  Meeting point:', decrypted.meetingPoint.toString());
    console.log('  Proof:', decrypted.proof);
    
    // Step 5: Test encoding
    console.log('\nStep 5: Testing cleartext encoding...');
    const cleartexts = ethers.AbiCoder.defaultAbiCoder().encode(
      ['bool', 'uint64'],
      [decrypted.hasMatch, decrypted.meetingPoint]
    );
    console.log('✓ Cleartexts encoded:', cleartexts);
    
    console.log('\n✅ All tests passed! Ready to reveal.');
    
  } catch (error: any) {
    console.error('\n❌ Test failed:', error);
    console.error('Error message:', error.message);
    console.error('Full error:', error);
  }
}




}