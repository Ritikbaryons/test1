import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-image-manager',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './image-manager.html',
  styleUrl: './image-manager.css',
})
export class ImageManagerComponent implements OnInit {
  images: any[] = [];
  isLoading = true;
  isModalOpen = false;
  isViewModalOpen = false;
  isEditMode = false;
  selectedImage: any = null;
  imageForm: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  isSubmitting = false;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private toastService: ToastService
  ) {
    this.imageForm = this.fb.group({
      title: ['', Validators.required],
      service: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadImages();
  }

  loadImages(): void {
    this.isLoading = true;
    this.apiService.getImages().subscribe({
      next: (response: any) => {
        console.log('Admin Image Manager Response:', response);
        if (response && response.success && Array.isArray(response.data)) {
          this.images = response.data;
        } else if (Array.isArray(response)) {
          this.images = response;
        }
        console.log('Loaded Images:', this.images);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading images:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.selectedImage = null;
    this.imageForm.reset();
    this.selectedFile = null;
    this.imagePreview = null;
    this.isModalOpen = true;
  }

  openEditModal(image: any): void {
    this.isEditMode = true;
    this.selectedImage = image;
    this.imageForm.patchValue({
      title: image.title,
      service: image.service,
      location: image.location
    });
    this.imagePreview = this.apiService.getAssetUrl(image.image_path);
    this.selectedFile = null;
    this.isModalOpen = true;
  }

  viewImage(image: any): void {
    this.selectedImage = image;
    this.isViewModalOpen = true;
  }

  closeModals(): void {
    this.isModalOpen = false;
    this.isViewModalOpen = false;
    this.selectedImage = null;
    this.imagePreview = null;
  }

  saveImage(): void {
    if (this.imageForm.invalid) return;

    this.isSubmitting = true;
    const formData = new FormData();
    formData.append('title', this.imageForm.get('title')?.value);
    formData.append('service', this.imageForm.get('service')?.value);
    formData.append('location', this.imageForm.get('location')?.value);
    
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.isEditMode && this.selectedImage) {
      this.apiService.updateImage(this.selectedImage.id, formData).subscribe({
        next: () => {
          this.toastService.success('Done');
          this.loadImages();
          this.closeModals();
          this.isSubmitting = false;
        },
        error: (err) => {
          console.error('Error updating image:', err);
          this.toastService.error('Failed to update image');
          this.isSubmitting = false;
        }
      });
    } else {
      if (!this.selectedFile) {
        this.toastService.error('Please select an image to upload');
        this.isSubmitting = false;
        return;
      }
      this.apiService.addImage(formData).subscribe({
        next: () => {
          this.toastService.success('Done');
          this.loadImages();
          this.closeModals();
          this.isSubmitting = false;
        },
        error: (err) => {
          console.error('Error adding image:', err);
          this.toastService.error('Failed to add image');
          this.isSubmitting = false;
        }
      });
    }
  }

  deleteImage(id: number): void {
    if (confirm('Are you sure you want to delete this image?')) {
      this.apiService.deleteImage(id).subscribe({
        next: () => this.loadImages(),
        error: (err) => console.error('Error deleting image:', err)
      });
    }
  }

  getAssetUrl(path: string): string {
    return this.apiService.getAssetUrl(path);
  }
}
