import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class AboutComponent {
  stats = [
    { value: '15+', label: 'Years of Experience' },
    { value: '1200+', label: 'Happy Clients' },
    { value: '500+', label: 'Weddings Covered' },
    { value: '100%', label: 'Satisfaction' }
  ];

  testimonials = [
    {
      name: 'Anita Roy',
      location: 'Patna',
      stars: '★★★★★',
      text: 'Moments Studio captured every emotion perfectly. Our wedding photos tell our story beautifully and naturally. We are so thankful for their incredible work!'
    },
    {
      name: 'Ravi Kumar',
      location: 'Patna',
      stars: '★★★★★',
      text: 'The team made us feel so comfortable, and the candid shots from our jaimala ceremony are simply priceless. Highly recommend Moments Studio to every couple!'
    },
    {
      name: 'Priya & Rahul',
      location: 'Patna',
      stars: '★★★★★',
      text: 'Amazing experience from start to finish. The pre-wedding shoot was so fun and the wedding photos were beyond our expectations. True professionals!'
    }
  ];
}
