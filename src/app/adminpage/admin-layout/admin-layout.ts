import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css'
})
export class AdminLayoutComponent {
  isSidebarOpen = true;

  menuItems = [
    { path: 'dashboard', label: 'Dashboard', icon: 'fas fa-th-large' },
    { path: 'images', label: 'Image Gallery', icon: 'fas fa-images' },
    { path: 'videos', label: 'Video Films', icon: 'fas fa-video' },
    { path: 'feedback', label: 'Client Feedback', icon: 'fas fa-star' },
    { path: 'inquiries', label: 'Contact Inquiries', icon: 'fas fa-envelope' },
  ];

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onLogout() {
    this.router.navigate(['/admin/login']);
  }
}
