import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { WalletComponent } from './components/wallet/wallet.component';
import { WalletService } from './services/wallet.service';
import { ContractService } from './services/contract.service';
import { FheService } from './services/fhe.service';
import { environment } from '../environments/environment';
import { FheService1 } from './services/fhe.servicecopy';
import { BehaviorSubject } from 'rxjs';
import { NegotiationMonitorService, NegotiationProgress } from './services/negotiation-monitor.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, WalletComponent, CommonModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  negotiation$!: BehaviorSubject<NegotiationProgress>;
  id: number = 0;
  constructor(
    private walletService: WalletService,
    private contractService: ContractService,
    private fheService: FheService,
    private fheService1: FheService1,
    private monitor: NegotiationMonitorService
  ) {}

  async ngOnInit(): Promise<void> {
    // Initialize contract
    this.contractService.initialize(
      environment.contractAddress,
      environment.rpcUrl
    );

    // Initialize FHE
    try {
      // await this.fheService.initialize(this.walletService.provider);
      await this.fheService1.initialize1();
      // await this.monitor.initialize();
      // this.negotiation$ = this.monitor.watchNegotiation(this.id);
      // await this.fheService.initialize();
    } catch (error) {
      console.error('FHE init failed:', error);
    }
  }
}
