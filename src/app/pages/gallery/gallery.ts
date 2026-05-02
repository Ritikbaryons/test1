import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css'
})
export class GalleryComponent implements OnInit {
  pageTitle = 'Capturing Memories';
  pageSubtitle = 'OUR WORK';

  images: any[] = [];
  isLoading: boolean = true;

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.fetchImages();
  }

  fetchImages(): void {
    this.isLoading = true;
    this.apiService.getImages().subscribe({
      next: (response: any) => {
        console.log('Gallery: Data Received', response);
        let rawData: any[] = [];

        if (response && response.success && Array.isArray(response.data)) {
          rawData = response.data;
        } else if (Array.isArray(response)) {
          rawData = response;
        }

        if (rawData && rawData.length > 0) {
          const mappedImages = rawData.map((img: any) => ({
            url: this.apiService.getAssetUrl(img.image_path),
            location: img.location || 'Patna, Bihar',
            category: img.service || 'Photography',
            title: img.title || 'Moment'
          }));
          
          console.log('Gallery: Mapped Images', mappedImages);
          this.images = [...mappedImages]; // Use spread to ensure reference change
        } else {
          console.warn('Gallery: Empty Data');
          this.loadMockData();
        }
        
        this.isLoading = false;
        this.cdr.detectChanges(); // Force UI update
      },
      error: (err) => {
        console.error('Gallery: API Error', err);
        this.loadMockData();
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  loadMockData(): void {
    this.images = [
      { url: 'assets/images/wedding_hero_1777525311142.png', location: 'Patna, Bihar', category: 'Wedding' },
      { url: 'assets/images/wedding_couple_portrait_1777525329405.png', location: 'Gaya, Bihar', category: 'Wedding' },
      { url: 'assets/images/pre_wedding_outdoor_1777525347926.png', location: 'Rajgir, Bihar', category: 'Pre-Wedding' }
    ];
  }
}
