import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

interface NavLink {
  path: string;
  label: string;
  exact?: boolean;
  external?: boolean;
  children?: NavLink[];
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {
  isScrolled = false;
  isMenuOpen = false;
  activeDropdown: string | null = null;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (!this.isMenuOpen) this.activeDropdown = null;
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.activeDropdown = null;
  }

  toggleDropdown(label: string, event: Event) {
    event.preventDefault();
    this.activeDropdown = this.activeDropdown === label ? null : label;
  }

  navLinks: NavLink[] = [
    { path: '/', label: 'Home', exact: true },
    { path: '/about', label: 'About' },
    {
      path: '#',
      label: 'Services',
      children: [
        { path: '/service/wedding', label: 'Wedding Photography' },
        { path: '/service/prewedding', label: 'Prewedding Photography' },
        { path: '/service/engagement', label: 'Engagement Photography' },
        { path: '/service/maternity', label: 'Maternity Photography' },
        { path: '/service/birthday', label: 'Birthday Photography' },
        { path: '/service/event', label: 'Event Photography' }
      ]
    },
    {
      path: '#',
      label: 'Gallery',
      children: [
        { path: '/gallery', label: 'Image' },
        { path: '/films', label: 'Films' }
      ]
    },
    { path: '/contact', label: 'Contact Us' }
  ];

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        this.isScrolled = window.scrollY > 50;
      });
    }
  }
}
