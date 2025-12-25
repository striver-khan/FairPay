import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type AlertType = 'success' | 'warning' | 'error';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="alert" [class]="'alert-' + type" *ngIf="message">
      <i class="fas" [class]="iconClass"></i>
      <div class="alert-content">
        <p class="alert-message">{{ message }}</p>
        <p class="alert-details" *ngIf="details">{{ details }}</p>
      </div>
    </div>
  `,
  styles: [`
    .alert {
      animation: slideIn 0.3s ease;
    }

    .alert-content {
      flex: 1;
    }

    .alert-message {
      font-weight: 500;
      margin-bottom: 0.25rem;
    }

    .alert-details {
      font-size: 0.875rem;
      opacity: 0.8;
    }

    @keyframes slideIn {
      from {
        transform: translateY(-1rem);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `]
})
export class AlertComponent {
  @Input() type: AlertType = 'success';
  @Input() message = '';
  @Input() details = '';

  get iconClass(): string {
    switch (this.type) {
      case 'success':
        return 'fa-check-circle';
      case 'warning':
        return 'fa-exclamation-triangle';
      case 'error':
        return 'fa-exclamation-circle';
      default:
        return 'fa-info-circle';
    }
  }
}
