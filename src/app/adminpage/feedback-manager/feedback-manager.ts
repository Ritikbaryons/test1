import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-feedback-manager',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './feedback-manager.html',
  styleUrl: './feedback-manager.css',
})
export class FeedbackManagerComponent implements OnInit {
  feedbacks: any[] = [];
  isLoading = true;
  isModalOpen = false;
  isViewModalOpen = false;
  selectedFeedback: any = null;
  requestForm: FormGroup;
  isSubmitting = false;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private toastService: ToastService
  ) {
    this.requestForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      customerName: ['', Validators.required],
      projectName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.isLoading = true;
    this.apiService.getAllFeedback().subscribe({
      next: (response: any) => {
        if (response && response.success && Array.isArray(response.data)) {
          this.feedbacks = response.data;
        } else if (Array.isArray(response)) {
          this.feedbacks = response;
        }
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading feedbacks:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  toggleRequestForm(): void {
    this.isModalOpen = !this.isModalOpen;
    if (this.isModalOpen) {
      this.requestForm.reset();
    }
  }

  closeModals(): void {
    this.isModalOpen = false;
    this.isViewModalOpen = false;
    this.selectedFeedback = null;
  }

  sendRequest(): void {
    if (this.requestForm.invalid) return;

    this.isSubmitting = true;
    this.apiService.sendFeedbackRequest(this.requestForm.value).subscribe({
      next: (res) => {
        this.toastService.success('Done');
        this.loadFeedbacks();
        this.isModalOpen = false; // Close the inline form
        this.requestForm.reset();
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error('Error sending request:', err);
        this.toastService.error('Failed to send invitation.');
        this.isSubmitting = false;
      }
    });
  }

  togglePublicStatus(feedback: any): void {
    const newStatus = !feedback.isActive;
    this.apiService.updateFeedbackStatus(feedback.id, newStatus).subscribe({
      next: () => {
        feedback.isActive = newStatus;
      },
      error: (err) => {
        console.error('Error updating status:', err);
        this.toastService.error('Failed to update visibility status.');
      }
    });
  }

  viewFeedback(feedback: any): void {
    this.selectedFeedback = feedback;
    this.isViewModalOpen = true;
  }

  getAssetUrl(path: string): string {
    return this.apiService.getAssetUrl(path);
  }
}
