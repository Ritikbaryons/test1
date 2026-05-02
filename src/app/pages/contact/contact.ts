import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    phone: '',
    service: '',
    city: '',
    message: ''
  };

  isSubmitting = false;

  constructor(
    private apiService: ApiService,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef
  ) {}

  onSubmit() {
    this.isSubmitting = true;
    this.cdr.detectChanges();
    
    // Create the payload matching backend schema
    const payload = {
      id: 0,
      name: this.formData.name,
      phone_number: this.formData.phone,
      city: this.formData.city,
      gmail: this.formData.email,
      services: this.formData.service,
      message: this.formData.message
    };

    console.log('Submitting Contact Form:', payload);

    this.apiService.submitContactForm(payload).subscribe({
      next: (response) => {
        console.log('Success:', response);
        this.toastService.success('Done');
        this.resetForm();
        this.isSubmitting = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error submitting form:', error);
        this.toastService.error('Something went wrong. Please try again later.');
        this.isSubmitting = false;
        this.cdr.detectChanges();
      }
    });
  }

  resetForm() {
    this.formData = {
      name: '',
      email: '',
      phone: '',
      service: '',
      city: '',
      message: ''
    };
  }
}
