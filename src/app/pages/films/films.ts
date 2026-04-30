import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from '../../pipes/safe-url-pipe';

@Component({
  selector: 'app-films',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe],
  templateUrl: './films.html',
  styleUrl: './films.css'
})
export class FilmsComponent {
  pageTitle = 'Our Beautiful Films';
  pageSubtitle = 'CINEMATOGRAPHY';

  videos = [
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'https://www.youtube.com/embed/jNQXAC9IVRw',
    'https://www.youtube.com/embed/l482T0yNkeo',
    'https://www.youtube.com/embed/9bZkp7q19f0'
  ];
}
