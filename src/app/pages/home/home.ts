import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

import { SafeUrlPipe } from '../../pipes/safe-url-pipe';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, SafeUrlPipe],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  heroData = {
    title: 'Best Wedding Photographers in Patna',
    subtitle: 'Capturing your timeless moments with perfection and creativity.',
    videoUrl: 'https://videos.pexels.com/video-files/8502758/8502758-uhd_3840_2160_24fps.mp4'
  };

  quoteData = {
    text: '"Love is the poetry of the senses. It captures the soul and turns moments into eternal memories."',
    author: 'Moments Studio'
  };

  currentIndex = 0;
  private intervalId: any;

  services = [
    {
      title: 'Wedding Photography',
      desc: 'Timeless wedding photography capturing real emotions and beautiful moments of your love story. Ever!',
      img: '/images/HomeWedding_Services.png'
    },
    {
      title: 'Pre Wedding Photography',
      desc: 'Pre-wedding photography capturing your love, chemistry, and moments in a natural, stylish story.',
      img: '/images/Homepage_Pre_Wedding_Photography.png'
    },
    {
      title: 'Event Photography',
      desc: 'Professional event photography capturing key moments, emotions, and details with clarity and style.',
      img: '/images/Homepage_Event Photography.png'
    }
  ];

  galleryPreview = [
    '/assets/images/wedding_hero_1777525311142.png',
    '/assets/images/wedding_couple_portrait_1777525329405.png',
    '/assets/images/pre_wedding_outdoor_1777525347926.png'
  ];

  currentBookingIndex = 0;
  animatedTitle = '';
  private bookingIntervalId: any;
  private charIntervalId: any;

  testimonials = [
    {
      stars: '★★★★★',
      text: '"I had a great experience with Moments Studio. The team is skilled, cooperative, and understands client requirements very well. Their communication and work quality are excellent. Highly recommended!"',
      author: 'Pankaj kumar sah',
      img: '/images/user1.png'
    },
    {
      stars: '★★★★★',
      text: '"Best photographers in Patna! They made our wedding look like a Bollywood movie. Every moment was captured with so much love and detail. Highly recommended to everyone!"',
      author: 'Amit & Sneha',
      img: '/images/user2.png'
    },
    {
      stars: '★★★★★',
      text: '"Their eye for detail is amazing. The pre-wedding shoot was so comfortable and the results were stunning. Professional and punctual throughout the process."',
      author: 'Rohan Verma',
      img: '/images/user3.png'
    }
  ];

  bookingCtaData = [
    {
      title: 'Book Your Wedding Photoshoot Today',
      subtext: 'Are you looking for the most exceptional candid wedding photography in Patna? We can help you! Find the best wedding photography packages that suit you and let\'s plan a remarkable wedding journey together!',
      images: {
        large: '/assets/images/booking_large.png',
        small1: '/assets/images/booking_small_1.png',
        small2: '/assets/images/booking_small_2.png'
      }
    },
    {
      title: 'Book Your Pre-Wedding Photoshoot Today',
      subtext: 'Capture the essence of your love story before the big day. Our pre-wedding shoots are designed to be fun, romantic, and uniquely you, set in stunning locations.',
      images: {
        large: '/assets/images/pre_wedding_large.png',
        small1: '/assets/images/pre_wedding_small_1.png',
        small2: '/assets/images/pre_wedding_small_2.png'
      }
    },
    {
      title: 'Book Your Birthday Photoshoot Today',
      subtext: 'Celebrate your special milestones with a professional photoshoot. From cake smashes to elegant portraits, we capture every joyful moment of your celebration.',
      images: {
        large: '/assets/images/birthday_large.png',
        small1: '/assets/images/birthday_small_1.png',
        small2: '/assets/images/birthday_small_2.png'
      }
    }
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cd: ChangeDetectorRef,
    private zone: NgZone
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.startAutoSlide();
      this.startBookingAutoChange();
    }
  }

  ngOnDestroy() {
    this.stopAutoSlide();
    this.stopBookingAutoChange();
    if (this.charIntervalId) clearInterval(this.charIntervalId);
  }

  startBookingAutoChange() {
    this.stopBookingAutoChange();
    // Start typewriter for the first slide immediately
    this.typeTitle(this.bookingCtaData[this.currentBookingIndex].title);
    this.bookingIntervalId = setInterval(() => {
      this.currentBookingIndex = (this.currentBookingIndex + 1) % this.bookingCtaData.length;
      this.typeTitle(this.bookingCtaData[this.currentBookingIndex].title);
      this.cd.detectChanges();
    }, 4000);
  }

  typeTitle(title: string) {
    if (this.charIntervalId) clearInterval(this.charIntervalId);
    this.animatedTitle = '';
    let i = 0;
    this.charIntervalId = setInterval(() => {
      this.animatedTitle += title[i];
      i++;
      this.cd.detectChanges();
      if (i >= title.length) clearInterval(this.charIntervalId);
    }, 50);
  }

  stopBookingAutoChange() {
    if (this.bookingIntervalId) clearInterval(this.bookingIntervalId);
    if (this.charIntervalId) clearInterval(this.charIntervalId);
  }

  startAutoSlide() {
    this.stopAutoSlide();
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
      this.cd.detectChanges();
    }, 1000);
  }

  stopAutoSlide() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  setSlide(index: number) {
    this.currentIndex = index;
    this.startAutoSlide();
  }
}
