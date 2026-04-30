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
      { icon: 'fab fa-facebook', link: '#' },
      { icon: 'fab fa-instagram', link: '#' },
      { icon: 'fab fa-youtube', link: '#' },
      { icon: 'fab fa-twitter', link: '#' }
    ]
  };

  companyLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'FAQs', path: '#' },
    { label: 'Blog', path: '#' },
    { label: 'Contact Us', path: '/contact' }
  ];

  serviceLinks = [
    { label: 'Wedding Photography', path: '/services' },
    { label: 'Pre-Wedding Shoot', path: '/services' },
    { label: 'Event Photography', path: '/services' },
    { label: 'Cinematography', path: '/services' }
  ];

  contactDetails = {
    address: 'Patna, Bihar, India',
    email: 'info@momentsstudio.in',
    phone: '+91 98765 43210'
  };
}
