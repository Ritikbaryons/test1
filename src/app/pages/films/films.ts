import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-films',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './films.html',
  styleUrl: './films.css'
})
export class FilmsComponent implements OnInit {
  pageTitle = 'Our Cinematic Stories';
  pageSubtitle = 'CINEMATOGRAPHY';

  videos: any[] = [
    { url: 'https://www.youtube.com/embed/gCTrwRASsAM?si=ef0nbUdJXKHtPxe8', isMain: true, title: 'Haldi Cinematic Highlights 4k' },
    { url: 'https://www.youtube.com/embed/AqlT-4RwIEk?si=PtmaKQ9SoAd5amOl', isMain: false, title: 'Best Pre wedding video shoot in Patna' },
    { url: 'https://www.youtube.com/embed/rs-yOHGGWTM?si=3FE8BtadeccCg42f', isMain: false, title: 'Bihari Wedding highlights video' },
    { url: 'https://www.youtube.com/embed/NgHmF-ClBY0?si=0s7YN0sX97h0Vlme', isMain: false, title: 'Maternity Shoot song reel' }
  ];

  constructor(
    private sanitizer: DomSanitizer,
    private apiService: ApiService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.fetchVideos();
  }

  fetchVideos(): void {
    this.apiService.getVideos().subscribe({
      next: (response: any) => {
        let rawData: any[] = [];
        if (response) {
          if (Array.isArray(response)) {
            rawData = response;
          } else if (response.data && Array.isArray(response.data)) {
            rawData = response.data;
          } else if (response.data) {
            rawData = [response.data];
          } else if (response.videos && Array.isArray(response.videos)) {
            rawData = response.videos;
          } else if (typeof response === 'object' && response.url) {
            rawData = [response];
          }
        }

        if (rawData && rawData.length > 0) {
          const hasMain = rawData.some(v => v.is_main === true || v.is_main === 1 || v.isMain === true);

          const fetchedVideos = rawData.map((v: any, index: number) => ({
            ...v,
            isMain: v.is_main === true || v.is_main === 1 || v.isMain === true || (!hasMain && index === 0)
          }));

          this.videos = fetchedVideos;
          this.cd.detectChanges();
        } else {
          this.loadMockData();
        }
      },
      error: (err) => {
        console.error('Error fetching videos:', err);
        this.loadMockData();
      }
    });
  }

  loadMockData(): void {
    this.videos = [
      { url: 'https://www.youtube.com/embed/gCTrwRASsAM?si=ef0nbUdJXKHtPxe8', isMain: true, title: 'Haldi Cinematic Highlights 4k' },
      { url: 'https://www.youtube.com/embed/AqlT-4RwIEk?si=PtmaKQ9SoAd5amOl', isMain: false, title: 'Best Pre wedding video shoot in Patna' },
      { url: 'https://www.youtube.com/embed/rs-yOHGGWTM?si=3FE8BtadeccCg42f', isMain: false, title: 'Bihari Wedding highlights video' },
      { url: 'https://www.youtube.com/embed/NgHmF-ClBY0?si=0s7YN0sX97h0Vlme', isMain: false, title: 'Maternity Shoot song reel' }
    ];
    this.cd.detectChanges();
  }

  getSafeUrl(url: string): SafeResourceUrl {
    if (!url) return this.sanitizer.bypassSecurityTrustResourceUrl('');
    let embedUrl = url;
    if (url.includes('watch?v=') && !url.includes('embed/')) {
      embedUrl = url.replace('watch?v=', 'embed/');
    } else if (url.includes('youtu.be/') && !url.includes('embed/')) {
      const parts = url.split('/');
      const idPart = parts[parts.length - 1];
      const videoId = idPart.split('?')[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  get mainVideo() {
    return this.videos.find(v => v.isMain) || this.videos[0];
  }

  get otherVideos() {
    return this.videos.filter(v => !v.isMain);
  }
}
