import { Component, OnInit, ChangeDetectorRef, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css'
})
export class GalleryComponent implements OnInit, AfterViewInit {
  pageTitle = 'Capturing Memories';
  pageSubtitle = 'OUR WORK';

  images: any[] = [];
  isLoading: boolean = true;

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    this.fetchImages();
  }

  ngAfterViewInit(): void {
    this.initScrollReveal();
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
            title: img.title || 'Moment',
            // Scatter values for animation
            tx: Math.floor(Math.random() * 400 - 200) + 'px',
            ty: Math.floor(Math.random() * 400 - 200) + 'px',
            tr: Math.floor(Math.random() * 40 - 20) + 'deg'
          }));

          this.images = [...mappedImages];
        } else {
          this.loadMockData();
        }

        this.isLoading = false;
        this.cdr.detectChanges();
        setTimeout(() => this.initScrollReveal(), 100);
      },
      error: (err) => {
        this.loadMockData();
        this.isLoading = false;
        this.cdr.detectChanges();
        setTimeout(() => this.initScrollReveal(), 100);
      }
    });
  }

  private initScrollReveal(): void {
    const items = this.el.nativeElement.querySelectorAll('.gallery-item');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });

    items.forEach((item: Element) => observer.observe(item));
  }

  loadMockData(): void {
    this.images = [
      { url: '/assets/images/wedding_hero_1777525311142.png', location: 'Patna, Bihar', category: 'Wedding', tx: '-50px', ty: '80px', tr: '5deg' },
      { url: '/assets/images/wedding_couple_portrait_1777525329405.png', location: 'Gaya, Bihar', category: 'Wedding', tx: '60px', ty: '-40px', tr: '-8deg' },
      { url: '/assets/images/pre_wedding_outdoor_1777525347926.png', location: 'Rajgir, Bihar', category: 'Pre-Wedding', tx: '-30px', ty: '-90px', tr: '12deg' }
    ];
  }
}
