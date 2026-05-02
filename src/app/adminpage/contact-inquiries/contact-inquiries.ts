import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-contact-inquiries',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-inquiries.html',
  styleUrl: './contact-inquiries.css',
})
export class ContactInquiriesComponent implements OnInit {
  inquiries: any[] = [];
  selectedInquiry: any = null;
  isModalOpen = false;
  isLoading = true;

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadInquiries();
  }

  loadInquiries(): void {
    this.isLoading = true;
    this.apiService.getContacts().subscribe({
      next: (response: any) => {
        if (response && response.success && Array.isArray(response.data)) {
          this.inquiries = response.data;
        } else if (Array.isArray(response)) {
          this.inquiries = response;
        }
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading inquiries:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  viewInquiry(inquiry: any): void {
    this.selectedInquiry = inquiry;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedInquiry = null;
  }
}
