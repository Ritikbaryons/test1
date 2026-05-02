import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      <div *ngFor="let toast of toastService.toasts()" 
           class="toast-item" 
           [class]="toast.type"
           (click)="toastService.remove(toast.id)">
        <div class="icon">
          <i class="fas" [class.fa-check-circle]="toast.type === 'success'" 
                        [class.fa-exclamation-circle]="toast.type === 'error'"
                        [class.fa-info-circle]="toast.type === 'info'"></i>
        </div>
        <div class="message">{{ toast.message }}</div>
        <div class="progress"></div>
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 12px;
      pointer-events: none;
    }

    .toast-item {
      pointer-events: auto;
      min-width: 280px;
      max-width: 400px;
      background: #ffffff;
      color: #1a1a1a;
      padding: 16px 20px;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.15);
      display: flex;
      align-items: center;
      gap: 15px;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      animation: slideIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      font-family: 'Montserrat', sans-serif;
    }

    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    .toast-item.success { border-left: 5px solid #28a745; }
    .toast-item.error { border-left: 5px solid #dc3545; }
    .toast-item.info { border-left: 5px solid #D4AF37; }

    .icon { font-size: 20px; }
    .success .icon { color: #28a745; }
    .error .icon { color: #dc3545; }
    .info .icon { color: #D4AF37; }

    .message {
      font-size: 14px;
      font-weight: 600;
      flex: 1;
    }

    .progress {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 3px;
      background: rgba(0,0,0,0.1);
      width: 100%;
      animation: progress 3s linear forwards;
    }

    .success .progress { background: rgba(40, 167, 69, 0.2); }
    .error .progress { background: rgba(220, 53, 69, 0.2); }
    .info .progress { background: rgba(212, 175, 55, 0.2); }

    @keyframes progress {
      from { width: 100%; }
      to { width: 0%; }
    }
  `]
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}
}
