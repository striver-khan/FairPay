// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-wallet',
//   imports: [],
//   templateUrl: './wallet.component.html',
//   styleUrl: './wallet.component.css'
// })
// export class WalletComponent {

// }
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { WalletService, WalletState } from '../../services/wallet.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent implements OnInit, OnDestroy {
  state: WalletState = {
    connected: false,
    address: null,
    chainId: null,
    balance: null
  };

  connecting = false;
  isCorrectNetwork = false;
  private sub?: Subscription;

  constructor(private walletService: WalletService) {}

  ngOnInit(): void {
    this.sub = this.walletService.walletState$.subscribe(state => {
      this.state = state;
      const targetChainId = environment.production === false ? environment.localChainId : 11155111;
      // this.isCorrectNetwork = this.walletService.isCorrectNetwork(11155111);
      this.isCorrectNetwork = this.walletService.isCorrectNetwork(targetChainId);
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  async connect(): Promise<void> {
    this.connecting = true;
    try {
      await this.walletService.connect();
    } catch (error: any) {
      alert(error.message || 'Connection failed');
    } finally {
      this.connecting = false;
    }
  }

  async switchNetwork(): Promise<void> {
    try {
      if (environment.production === false) return;
      await this.walletService.switchNetwork(11155111);
    } catch (error: any) {
      alert('Failed to switch network');
    }
  }

  disconnect(): void {
    this.walletService.disconnect();
  }

  formatAddress(address: string): string {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  formatBalance(balance: string | null): string {
    if (!balance) return '0.00';
    return parseFloat(balance).toFixed(4);
  }
}