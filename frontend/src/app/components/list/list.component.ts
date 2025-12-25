import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { WalletService } from '../../services/wallet.service';
import { ContractService } from '../../services/contract.service';
import { Negotiation, NegotiationState, STATE_NAMES } from '../../../models/negotiation';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  negotiations: Negotiation[] = [];
  loading = false;
  isConnected = false;
  userAddress: string | null = null;

  constructor(
    private walletService: WalletService,
    private contractService: ContractService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.walletService.walletState$.subscribe(state => {
      this.isConnected = state.connected;
      this.userAddress = state.address;

      if (state.connected) {
        this.loadNegotiations();
      }
    });
  }

  async loadNegotiations(): Promise<void> {
    if (!this.userAddress) return;

    this.loading = true;

    try {
      const ids = await this.contractService.getUserNegotiations(this.userAddress);

      this.negotiations = await Promise.all(
        ids.map(id => this.contractService.getNegotiation(id))
      );
    } catch (error) {
      console.error('Load failed:', error);
    } finally {
      this.loading = false;
    }
  }

  viewDetails(id: number): void {
    this.router.navigate(['/details', id]);
  }

  createNew(): void {
    this.router.navigate(['/create']);
  }

  isEmployer(neg: Negotiation): boolean {
    return neg.employer.toLowerCase() === this.userAddress?.toLowerCase();
  }

  getStateName(state: NegotiationState): string {
    return STATE_NAMES[state] || 'Unknown';
  }

  getTimeRemaining(deadline: number): string {
    const now = Math.floor(Date.now() / 1000);
    const remaining = deadline - now;

    if (remaining <= 0) return 'Expired';

    const days = Math.floor(remaining / 86400);
    const hours = Math.floor((remaining % 86400) / 3600);
    const minutes = Math.floor((remaining % 3600) / 60);

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  }

  formatAddress(address: string): string {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }
}