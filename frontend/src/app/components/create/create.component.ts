import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { WalletService } from '../../services/wallet.service';
import { ContractService } from '../../services/contract.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {
  isConnected = false;
  creating = false;
  createdId: number | null = null;
  error: string | null = null;

  formData = {
    candidate: '',
    title: '',
    deadlineHours: 24
  };

  constructor(
    private walletService: WalletService,
    private contractService: ContractService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('CreateComponent initialized');
    this.walletService.walletState$.subscribe(state => {
      this.isConnected = state.connected;
      console.log('Wallet state changed:', state);
    });
  }

  async onSubmit(): Promise<void> {
    if (!this.isConnected) return;

    this.creating = true;
    this.error = null;

    try {
      const result = await this.contractService.createNegotiation(
        this.formData.candidate,
        this.formData.title,
        this.formData.deadlineHours
      );

      this.createdId = result.id;
    } catch (error: any) {
      this.error = error.message || 'Failed to create negotiation';
    } finally {
      this.creating = false;
    }
  }

  viewNegotiation(): void {
    if (this.createdId !== null) {
      this.router.navigate(['/details', this.createdId]);
    }
  }

  reset(): void {
    this.formData = {
      candidate: '',
      title: '',
      deadlineHours: 24
    };
    this.createdId = null;
    this.error = null;
  }
}