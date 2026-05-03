import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, ChangeDetectorRef, NgZone, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Title, Meta } from '@angular/platform-browser';

import { SafeUrlPipe } from '../../pipes/safe-url-pipe';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, SafeUrlPipe],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  heroData = {
    title: 'Best Wedding Photographer in Patna',
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
      img: 'assets/images/HomeWedding_Services.jpg',
      path: '/service/wedding'
    },
    {
      title: 'Pre Wedding Photography',
      desc: 'Pre-wedding photography capturing your love, chemistry, and moments in a natural, stylish story.',
      img: 'assets/images/Homepage_Pre_Wedding_Photography.svg',
      path: '/service/prewedding'
    },
    {
      title: 'Event Photography',
      desc: 'Professional event photography capturing key moments, emotions, and details with clarity and style.',
      img: 'assets/images/event_small_1.png',
      path: '/service/event'
    }
  ];

  galleryPreview: any[] = [];
  selectedImage: any = null;

  currentBookingIndex = 0;
  animatedTitle = '';
  animatedQuote = '';
  animatedAuthor = '';
  isQuoteFinished = false;
  private bookingIntervalId: any;
  private charIntervalId: any;
  private quoteCharIntervalId: any;
  private authorCharIntervalId: any;
  private hasTypedQuote = false;

  testimonials = [
    {
      stars: '★★★★★',
      text: '"A big thank you to Moments Studio for capturing all the wonderful moments and creating beautiful memories. Special thanks to Ajit Singh, who has been extremely helpful and on board with our request. He is an extremely humble and talented person."',
      author: 'Krishna Singh',
      img: 'assets/images/user_avatar.jpg'
    },
    {
      stars: '★★★★★',
      text: '"The final photos and video are absolutely stunning. They perfectly captured the emotions and essence of my baby birthday, and we are really blown away by the quality of image. These are memories we will cherish forever."All thanks to teammates who are very polite and professional.Best photographers in Patna! They made our wedding look like a Bollywood movie. Every moment was captured with so much love and detail. Highly recommended to everyone!"',
      author: 'Shalinee Kumari',
      img: 'assets/images/user_avatar.jpg'
    },
    {
      stars: '★★★★★',
      text: '"Excellent team with great work, supportive, friendly and creative one. Highly satisfied and very much thankful to full team for their work. 😇🤗❤."',
      author: 'prerna singh',
      img: 'assets/images/user_avatar.jpg'
    },
    {
      stars: '★★★★★',
      text: '"A big thank you to the Moments Studio team for making our big day even bigger. Photos and Video quality are awesome. They are very prompt and professional. Ajit Singh is very supportive, friendly and creative. He listens to all your requests."',
      author: 'Pallavi Raj',
      img: 'assets/images/user_avatar.jpg'
    },
    {
      stars: '★★★★★',
      text: '"Thank you so much Ajit ji from Moments Studio for capturing all the beautiful moments and creating an amazing album... The quality of the photos and the album pages are really rich in class... 😍😍"',
      author: 'Swati Rani',
      img: 'assets/images/user_avatar.jpg'
    },
    {
      stars: '★★★★★',
      text: '"He did a very good job by providing everything on time and I didn’t need to chase him for getting things. Also, the quality of work was fantastic."',
      author: 'Kratika Jain',
      img: 'assets/images/user_avatar.jpg'
    },
    {
      stars: '★★★★★',
      text: '"I would definitely recommend this team to shoot for wedding festivities as, it is one of the best at its work. The quality work and its outcome is really appreciable. Mr. Ajit, the skilled mentor, is a humble person who has trained his team very well. Kudos to the team and best wishes!"',
      author: 'Pratyush Alok',
      img: 'assets/images/user_avatar.jpg'
    },
    {
      stars: '★★★★★',
      text: '"I love how you treat your customers very fluently. Secondly, I would say everything is satisfactory. And thank you so much for delivering on time. This is the best photo LED frame I got. Thank you so much Moments Studio. Keep up the good work. ❤️"',
      author: 'Hem Hems',
      img: 'assets/images/user_avatar.jpg'
    }
  ];

  bookingCtaData = [
    {
      title: 'Book Your Wedding Photoshoot Today',
      subtext: 'Are you looking for the most exceptional candid wedding photography in Patna? We can help you! Find the best wedding photography packages that suit you and let\'s plan a remarkable wedding journey together!',
      images: {
        large: 'assets/images/booking_large.png',
        small1: 'assets/images/booking_small_1.png',
        small2: 'assets/images/booking_small_2.png'
      }
    },
    {
      title: 'Book Your Pre-Wedding Photoshoot Today',
      subtext: 'Capture the essence of your love story before the big day. Our pre-wedding shoots are designed to be fun, romantic, and uniquely you, set in stunning locations.',
      images: {
        large: 'assets/images/pre_wedding_large.png',
        small1: 'assets/images/pre_wedding_small_1.png',
        small2: 'assets/images/pre_wedding_small_2.png'
      }
    },
    {
      title: 'Book Your Birthday Photoshoot Today',
      subtext: 'Celebrate your special milestones with a professional photoshoot. From cake smashes to elegant portraits, we capture every joyful moment of your celebration.',
      images: {
        large: 'assets/images/birthday_large.png',
        small1: 'assets/images/birthday_small_1.png',
        small2: 'assets/images/birthday_small_2.png'
      }
    }
  ];

  faqs = [
    {
      question: 'What photography services do you offer?',
      answer: 'We provide full-coverage wedding photography, cinematic films, pre-wedding couple shoots, and event photography across Patna and all of Bihar.',
      open: false
    },
    {
      question: 'How do we book a session or get a quote?',
      answer: 'You can tap the "Get a Quote" button on our page, or reach out directly via WhatsApp using the floating button at the bottom of the screen.',
      open: false
    },
    {
      question: 'What is the turnaround time for receiving our photos?',
      answer: 'Usually, your beautifully edited photographs and cinematic highlight films will be delivered within 4 to 6 weeks following the event.',
      open: false
    },
    {
      question: 'Do you travel outside Patna for weddings?',
      answer: 'Yes! We love to travel and are fully available for destination weddings and out-of-station pre-wedding shoots.',
      open: false
    }
  ];

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cd: ChangeDetectorRef,
    private zone: NgZone,
    private el: ElementRef,
    private apiService: ApiService,
    private titleService: Title,
    private metaService: Meta
  ) { }

  ngOnInit() {
    this.setSEO();
    if (isPlatformBrowser(this.platformId)) {
      this.startAutoSlide();
      this.startBookingAutoChange();
      this.fetchGalleryPreview();
    }
  }

  private setSEO() {
    this.titleService.setTitle('Best Wedding Photographer in Patna | Candid & Cinematic Photography');
    this.metaService.updateTag({
      name: 'description',
      content: 'Looking for the best wedding photographer in Patna? Moments Studio offers candid, cinematic & pre-wedding photography services.'
    });
    this.metaService.updateTag({
      name: 'keywords',
      content: 'wedding photographer in Patna, best wedding photographer in Patna, pre wedding photographer in Patna, wedding photography packages Patna'
    });
  }

  fetchGalleryPreview(): void {
    this.apiService.getImages().subscribe({
      next: (response: any) => {
        let rawData: any[] = [];
        if (response && response.success && Array.isArray(response.data)) {
          rawData = response.data;
        } else if (Array.isArray(response)) {
          rawData = response;
        }

        if (rawData && rawData.length > 0) {
          // Sort by createdAt descending
          const sorted = rawData.sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          });

          // Take latest 9
          const latest = sorted.slice(0, 9);

          this.galleryPreview = latest.map(img => ({
            url: this.apiService.getAssetUrl(img.image_path),
            category: img.service || 'Photography',
            location: img.location || 'Patna, Bihar',
            title: img.title || 'Wedding Moment',
            service: img.service || 'Wedding'
          }));
        } else {
          // Fallback if no images found
          this.galleryPreview = [
            { url: 'assets/images/wedding_hero_1777525311142.png', category: 'Wedding', location: 'Patna', title: 'Wedding', service: 'Wedding' },
            { url: 'assets/images/wedding_couple_portrait_1777525329405.png', category: 'Portrait', location: 'Patna', title: 'Portrait', service: 'Wedding' },
            { url: 'assets/images/pre_wedding_outdoor_1777525347926.png', category: 'Pre-Wedding', location: 'Patna', title: 'Pre-Wedding', service: 'Wedding' }
          ];
        }
        this.cd.detectChanges();
        setTimeout(() => this.initScrollReveal(), 100);
      },
      error: (err) => {
        console.error('Home: API Error', err);
        this.galleryPreview = [
          { url: 'assets/images/wedding_hero_1777525311142.png', category: 'Wedding', location: 'Patna', title: 'Wedding', service: 'Wedding' },
          { url: 'assets/images/wedding_couple_portrait_1777525329405.png', category: 'Portrait', location: 'Patna', title: 'Portrait', service: 'Wedding' },
          { url: 'assets/images/pre_wedding_outdoor_1777525347926.png', category: 'Pre-Wedding', location: 'Patna', title: 'Pre-Wedding', service: 'Wedding' }
        ];
        this.cd.detectChanges();
        setTimeout(() => this.initScrollReveal(), 100);
      }
    });
  }

  openLightbox(img: any) {
    this.selectedImage = img;
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden';
    }
  }

  closeLightbox() {
    this.selectedImage = null;
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'auto';
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initScrollReveal();
    }
  }

  private initScrollReveal() {
    const revealElements = this.el.nativeElement.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Start quote typing when visible
          if (entry.target.classList.contains('quote-content') && !this.hasTypedQuote) {
            this.typeQuote(this.quoteData.text);
          }
        }
      });
    }, { threshold: 0.05 }); // Lower threshold for better UX

    revealElements.forEach((el: Element) => observer.observe(el));

    // Observe for dynamically added elements (like booking slides)
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node instanceof HTMLElement) {
            if (node.classList.contains('reveal-on-scroll')) {
              observer.observe(node);
            }
            node.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
          }
        });
      });
    });

    mutationObserver.observe(this.el.nativeElement, { childList: true, subtree: true });
  }

  typeQuote(text: string) {
    this.hasTypedQuote = true;
    if (this.quoteCharIntervalId) clearInterval(this.quoteCharIntervalId);
    this.animatedQuote = '';
    this.animatedAuthor = '';
    let i = 0;
    this.quoteCharIntervalId = setInterval(() => {
      this.animatedQuote += text[i];
      i++;
      this.cd.detectChanges();
      if (i >= text.length) {
        clearInterval(this.quoteCharIntervalId);
        this.isQuoteFinished = true;
        this.cd.detectChanges();
        // Start typing author after a small pause
        setTimeout(() => this.typeAuthor('— ' + this.quoteData.author), 500);
      }
    }, 40);
  }

  typeAuthor(text: string) {
    if (this.authorCharIntervalId) clearInterval(this.authorCharIntervalId);
    this.animatedAuthor = '';
    let i = 0;
    this.authorCharIntervalId = setInterval(() => {
      this.animatedAuthor += text[i];
      i++;
      this.cd.detectChanges();
      if (i >= text.length) clearInterval(this.authorCharIntervalId);
    }, 50);
  }

  ngOnDestroy() {
    this.stopAutoSlide();
    this.stopBookingAutoChange();
    if (this.charIntervalId) clearInterval(this.charIntervalId);
    if (this.quoteCharIntervalId) clearInterval(this.quoteCharIntervalId);
    if (this.authorCharIntervalId) clearInterval(this.authorCharIntervalId);
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
