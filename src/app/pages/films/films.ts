import { Component, OnInit } from '@angular/core';
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
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.fetchVideos();
  }

  fetchVideos(): void {
    this.apiService.getVideos().subscribe({
      next: (response: any) => {
        let rawData: any[] = [];
        
        // Handle both wrapped {data: []} and raw [] formats
        if (response && response.success && Array.isArray(response.data)) {
          rawData = response.data;
        } else if (Array.isArray(response)) {
          rawData = response;
        }

        if (rawData.length > 0) {
          const fetchedVideos = rawData.map((v: any, index: number) => ({
            ...v,
            isMain: v.hasOwnProperty('is_main') ? v.is_main : (index === 0)
          }));

          if (!fetchedVideos.some(v => v.isMain)) {
            fetchedVideos[0].isMain = true;
          }

          this.videos = fetchedVideos;
        }
      },
      error: (err) => {
        console.error('Error fetching videos:', err);
        // We already have mock data as initial state, so no action needed on error
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
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  get mainVideo() {
    return this.videos.find(v => v.isMain) || this.videos[0];
  }

  get otherVideos() {
    return this.videos.filter(v => !v.isMain);
  }
}
