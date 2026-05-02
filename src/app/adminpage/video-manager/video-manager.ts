import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-video-manager',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './video-manager.html',
  styleUrl: './video-manager.css',
})
export class VideoManagerComponent implements OnInit {
  videos: any[] = [];
  isLoading = true;
  isModalOpen = false;
  isEditMode = false;
  selectedVideo: any = null;
  videoForm: FormGroup;
  
  currentPage = 1;
  pageSize = 10;

  get paginatedVideos() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.videos.slice(start, start + this.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.videos.length / this.pageSize);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private toastService: ToastService
  ) {
    this.videoForm = this.fb.group({
      title: ['', Validators.required],
      url: ['', [Validators.required, Validators.pattern(/https?:\/\/.+/)]],
      is_main: [false]
    });
  }

  ngOnInit(): void {
    this.loadVideos();
  }

  loadVideos(): void {
    this.isLoading = true;
    this.apiService.getVideos().subscribe({
      next: (response: any) => {
        if (response && response.success && Array.isArray(response.data)) {
          this.videos = response.data;
        } else if (Array.isArray(response)) {
          this.videos = response;
        }
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading videos:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.selectedVideo = null;
    this.videoForm.reset({ is_main: false });
    this.isModalOpen = true;
  }

  openEditModal(video: any): void {
    this.isEditMode = true;
    this.selectedVideo = video;
    this.videoForm.patchValue({
      title: video.title,
      url: video.url,
      is_main: video.is_main
    });
    this.isModalOpen = true;
  }

  closeModals(): void {
    this.isModalOpen = false;
    this.selectedVideo = null;
  }

  isSubmitting = false;

  saveVideo(): void {
    if (this.videoForm.invalid) return;

    this.isSubmitting = true;
    const videoData = this.videoForm.value;

    if (this.isEditMode && this.selectedVideo) {
      this.apiService.updateVideo(this.selectedVideo.id, videoData).subscribe({
        next: () => {
          this.toastService.success('Done');
          this.loadVideos();
          this.closeModals();
          this.isSubmitting = false;
        },
        error: (err) => {
          console.error('Error updating video:', err);
          this.toastService.error('Failed to update video');
          this.isSubmitting = false;
        }
      });
    } else {
      this.apiService.addVideo(videoData).subscribe({
        next: () => {
          this.toastService.success('Done');
          this.loadVideos();
          this.closeModals();
          this.isSubmitting = false;
        },
        error: (err) => {
          console.error('Error adding video:', err);
          this.toastService.error('Failed to add video');
          this.isSubmitting = false;
        }
      });
    }
  }

  deleteVideo(id: number): void {
    if (confirm('Are you sure you want to delete this video?')) {
      this.apiService.deleteVideo(id).subscribe({
        next: () => this.loadVideos(),
        error: (err) => console.error('Error deleting video:', err)
      });
    }
  }
}
