import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.html',
  styleUrl: './services.css'
})
export class ServicesComponent {
  services = [
    { title: 'Wedding Photography', desc: 'Capturing the rituals and emotions of your big day.', icon: 'fas fa-camera' },
    { title: 'Cinematography', desc: 'High-quality wedding films and highlights.', icon: 'fas fa-video' },
    { title: 'Pre-Wedding Shoot', desc: 'Creative outdoor shoots for couples.', icon: 'fas fa-heart' },
    { title: 'Event Coverage', desc: 'Professional coverage for corporate and private events.', icon: 'fas fa-calendar-alt' },
    { title: 'Maternity Shoot', desc: 'Preserving the beauty of motherhood.', icon: 'fas fa-baby' },
    { title: 'Portrait Photography', desc: 'Stunning portraits for individuals and families.', icon: 'fas fa-user' }
  ];
}
