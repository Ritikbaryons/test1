import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css'
})
export class GalleryComponent {
  pageTitle = 'Capturing Memories';
  pageSubtitle = 'OUR WORK';
  
  images = [
    '/assets/images/wedding_hero_1777525311142.png',
    '/assets/images/wedding_couple_portrait_1777525329405.png',
    '/assets/images/pre_wedding_outdoor_1777525347926.png',
    '/assets/images/wedding_hero_1777525311142.png',
    '/assets/images/wedding_couple_portrait_1777525329405.png',
    '/assets/images/pre_wedding_outdoor_1777525347926.png'
  ];
}
