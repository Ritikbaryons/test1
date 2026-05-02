import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './feedback.html',
  styleUrl: './feedback.css',
})
export class FeedbackComponent implements OnInit {
  feedbackForm: FormGroup;
  token: string | null = null;
  rating = 0;
  hoverRating = 0;
  imagePreview: string | null = null;
  selectedFile: File | null = null;
  isSubmitting = false;
  isSuccess = false;
  isLoading = true;
  isInvalidToken = false;
  projectInfo: any = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private toastService: ToastService
  ) {
    this.feedbackForm = this.fb.group({
      customerName: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      rating: [0, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    if (this.token) {
      this.fetchFeedbackStatus();
    } else {
      this.isLoading = false;
      this.isInvalidToken = true;
    }
  }

  fetchFeedbackStatus() {
    if (!this.token) return;

    this.isLoading = true;
    this.apiService.getFeedbackStatus(this.token).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        if (res.success && res.data) {
          this.projectInfo = res.data;
          this.feedbackForm.patchValue({ customerName: res.data.customerName });
          if (res.data.status === 'SUBMITTED') {
            this.isSuccess = true;
          }
        } else {
          this.isInvalidToken = true;
        }
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.isLoading = false;
        this.isInvalidToken = true;
        this.cdr.detectChanges();
      }
    });
  }

  setRating(val: number) {
    this.rating = val;
    this.feedbackForm.patchValue({ rating: val });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.imagePreview = URL.createObjectURL(file);
      this.cdr.detectChanges();
    }
  }

  onSubmit() {
    if (this.feedbackForm.valid && this.token) {
      this.isSubmitting = true;

      const formData = new FormData();
      formData.append('customerName', this.feedbackForm.value.customerName);
      formData.append('description', this.feedbackForm.value.description);
      formData.append('rating', this.feedbackForm.value.rating.toString());
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      this.apiService.submitFeedback(this.token, formData).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.isSuccess = true;
          this.toastService.success('Done');
          window.scrollTo(0, 0);
          this.cdr.detectChanges();
        },
        error: (err: any) => {
          this.isSubmitting = false;
          this.toastService.error('Failed to submit feedback. Please try again.');
          this.cdr.detectChanges();
        }
      });
    }
  }
}
