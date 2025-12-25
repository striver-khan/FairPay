import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { WalletComponent } from './components/wallet/wallet.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, WalletComponent],
  template: `
    <nav>
      <a routerLink="/list" routerLinkActive="active">Negotiations</a>
      <a routerLink="/create" routerLinkActive="active">New Negotiation</a>
      <app-wallet></app-wallet>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    nav {
      background: #3b82f6;
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    nav a {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: all 0.3s ease;
    }

    nav a:hover,
    nav a.active {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-1px);
    }
  `]
})
export class AppComponent {
  title = 'FairPay';
}
