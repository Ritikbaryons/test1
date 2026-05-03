import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class FooterComponent {
  companyInfo = {
    description: 'Capturing your beautiful moments forever. We are a premium photography and cinematography studio based in Patna, dedicated to making your celebrations eternal.',
    socials: [
      { icon: 'fab fa-facebook-f', link: 'https://www.facebook.com/moments1studio' },
      { icon: 'fab fa-instagram', link: 'https://www.instagram.com/moments1studio' },
      { icon: 'fab fa-youtube', link: 'https://www.youtube.com/c/MomentsStudio' }
    ]
  };

  companyLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact Us', path: '/contact' }
  ];

  serviceLinks = [
    { label: 'Wedding Photography', path: '/service/wedding' },
    { label: 'Pre-Wedding Shoot', path: '/service/prewedding' },
    { label: 'Event Photography', path: '/service/event' },
    { label: 'Cinematography', path: '/service/wedding' } // Cinematography is often part of wedding
  ];

  contactDetails = {
    address: 'Patna, Bihar, India',
    email: 'momentsstudio674@gmail.com',
    phone: '+91 70047 42225'
  };
}
