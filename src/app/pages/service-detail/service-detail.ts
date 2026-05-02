import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

interface ServiceData {
  title: string;
  subtitle: string;
  description: string;
  mainImage: string;
  portfolioItems: { image: string; title: string; location: string; category: string }[];
  whyChooseUs: { title: string; text: string; icon: string }[];
  faqs: { question: string; answer: string; active?: boolean }[];
  seoContent: { title: string; text: string };
}

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './service-detail.html',
  styleUrl: './service-detail.css'
})
export class ServiceDetailComponent implements OnInit, OnDestroy {
  serviceId: string = '';
  serviceData: ServiceData | null = null;
  currentSlideIndex = 0;
  isSubmitting = false;

  formData = {
    name: '',
    phone: '',
    city: '',
    email: '',
    service: ''
  };

  autoSlideInterval: any;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.serviceId = params.get('id') || 'wedding';
      this.loadServiceData();

      // Scroll to top when changing route
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
      }
      this.startAutoSlide();
    });
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  onSubmit(): void {
    this.isSubmitting = true;
    
    // Create the payload matching backend schema
    const payload = {
      id: 0,
      name: this.formData.name,
      phone_number: this.formData.phone,
      city: this.formData.city,
      gmail: this.formData.email,
      services: this.formData.service,
      message: 'Service Detail Inquiry'
    };

    console.log('Submitting Service Detail Inquiry:', payload);

    this.apiService.submitContactForm(payload).subscribe({
      next: (response) => {
        console.log('Success:', response);
        alert('Thank you! Your inquiry has been received.');
        this.resetForm();
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error('Error submitting form:', error);
        alert('Something went wrong. Please try again later.');
        this.isSubmitting = false;
      }
    });
  }

  resetForm() {
    this.formData = {
      name: '',
      phone: '',
      city: '',
      email: '',
      service: ''
    };
  }

  toggleFaq(index: number): void {
    if (this.serviceData && this.serviceData.faqs) {
      this.serviceData.faqs[index].active = !this.serviceData.faqs[index].active;
    }
  }

  // Placeholder data dictionary for each service
  private servicesDB: { [key: string]: ServiceData } = {
    'wedding': {
      title: 'Wedding Photography',
      subtitle: 'Capturing the Magic of Your Special Day',
      description: 'Your wedding day is one of the most important milestones of your life. Our wedding photography service is dedicated to capturing the raw emotions, the stolen glances, and the grand celebrations that make your day unique. We blend cinematic storytelling with candid moments to deliver a timeless collection of memories.',
      mainImage: '/assets/images/home1.png',
      portfolioItems: [
        { image: '/assets/images/home1.png', title: 'The Royal Union', location: 'Patna, Bihar', category: 'Wedding' },
        { image: '/assets/images/wedding_couple_portrait_1777525329405.png', title: 'Sunset Vows', location: 'Gaya, Bihar', category: 'Wedding' },
        { image: '/assets/images/wedding_hero_1777525311142.png', title: 'Eternal Love', location: 'Muzaffarpur, Bihar', category: 'Wedding' },
        { image: '/assets/images/about_us_page_1777525057236.png', title: 'Traditional Elegance', location: 'Patna, Bihar', category: 'Wedding' },
        { image: '/assets/images/home1.png', title: 'Classic Romance', location: 'Bihar Sharif', category: 'Wedding' }
      ],
      whyChooseUs: [
        { title: 'Story-Driven Approach', text: 'We focus on the narrative of your love story.', icon: 'fas fa-book-open' },
        { title: 'Experienced Team', text: 'Over a decade of experience in premium wedding photography.', icon: 'fas fa-users' },
        { title: 'Cinematic Editing', text: 'High-end color grading and retouching.', icon: 'fas fa-film' }
      ],
      faqs: [
        { question: 'When should I book my wedding photographer?', answer: 'We recommend booking at least 6-12 months in advance to ensure availability for your date.' },
        { question: 'How many photos will I receive?', answer: 'For a full-day wedding, you can expect between 400-600 professionally edited high-resolution images.' },
        { question: 'Do you offer wedding albums?', answer: 'Yes, we offer premium, handcrafted wedding albums with various customization options.' }
      ],
      seoContent: {
        title: 'Best Wedding Photographer in Patna',
        text: 'Looking for wedding photography in Patna that perfectly captures your love story? Moments Studio is a leading wedding photographer in Patna, known for creative concepts, candid moments, and cinematic visuals. We specialize in capturing real emotions and turning them into timeless memories on your big day.'
      }
    },
    'prewedding': {
      title: 'Pre-Wedding Photography',
      subtitle: 'Celebrate Your Journey Before the "I Do"',
      description: 'Pre-wedding shoots are all about capturing your chemistry in a relaxed, beautiful setting. Whether you want a dramatic cinematic theme, a casual romantic vibe, or an adventurous outdoor session, we create stunning visual stories that reflect your unique bond before the big day.',
      mainImage: '/assets/images/wedding_couple_portrait_1777525329405.png',
      portfolioItems: [
        { image: '/assets/images/wedding_couple_portrait_1777525329405.png', title: 'Golden Hour Bliss', location: 'Ganga Ghat, Patna', category: 'Pre-Wedding' },
        { image: '/assets/images/home1.png', title: 'Urban Love', location: 'Patna Marine Drive', category: 'Pre-Wedding' },
        { image: '/assets/images/about_us_page_1777525057236.png', title: 'Nature\'s Embrace', location: 'Eco Park, Patna', category: 'Pre-Wedding' },
        { image: '/assets/images/wedding_hero_1777525311142.png', title: 'Vintage Vibes', location: 'Patna Museum', category: 'Pre-Wedding' }
      ],
      whyChooseUs: [
        { title: 'Location Scouting', text: 'We find the perfect, breathtaking backdrops.', icon: 'fas fa-map-marker-alt' },
        { title: 'Creative Direction', text: 'Guidance on posing and styling for natural looks.', icon: 'fas fa-paint-brush' },
        { title: 'Personalized Themes', text: 'Concepts designed around your personal love story.', icon: 'fas fa-heart' }
      ],
      faqs: [
        { question: 'What should we wear for our pre-wedding shoot?', answer: 'We provide a detailed styling guide based on your chosen theme and location.' },
        { question: 'Can we suggest our own locations?', answer: 'Absolutely! We love exploring new locations that have special meaning to you.' },
        { question: 'How long does a pre-wedding shoot take?', answer: 'Sessions typically last between 4-8 hours depending on the package and number of locations.' }
      ],
      seoContent: {
        title: 'Best Pre Wedding Photographer in Patna',
        text: 'Looking for pre wedding photography in Patna that perfectly captures your love story? Moments Studio is a leading pre wedding photographer in Patna, known for creative concepts, candid moments, and cinematic visuals. We specialize in capturing real emotions and turning them into timeless memories before your big day.'
      }
    },
    'engagement': {
      title: 'Engagement Photography',
      subtitle: 'The Beginning of Forever',
      description: 'From surprise proposals to grand engagement parties, we ensure the spark of your commitment is perfectly immortalized. We discreetly capture the tears of joy, the joyous laughter of families, and the intricate details of your rings.',
      mainImage: '/assets/images/wedding_hero_1777525311142.png',
      portfolioItems: [
        { image: '/assets/images/wedding_hero_1777525311142.png', title: 'Ring Ceremony', location: 'Patna', category: 'Engagement' },
        { image: '/assets/images/home1.png', title: 'Soulmates', location: 'Gaya', category: 'Engagement' },
        { image: '/assets/images/wedding_couple_portrait_1777525329405.png', title: 'The Promise', location: 'Ara', category: 'Engagement' }
      ],
      whyChooseUs: [
        { title: 'Candid Moments', text: 'Capturing genuine reactions and emotions.', icon: 'fas fa-smile' },
        { title: 'Discreet Coverage', text: 'We blend in with the crowd to capture raw moments.', icon: 'fas fa-eye-slash' },
        { title: 'Quick Delivery', text: 'Fast turnaround so you can announce your news.', icon: 'fas fa-bolt' }
      ],
      faqs: [
        { question: 'Do you cover surprise proposals?', answer: 'Yes! We love capturing the raw emotion of a surprise proposal and can help with the planning to ensure perfect shots.' },
        { question: 'Can we use these photos for our Save the Date?', answer: 'Definitely. We provide high-res files perfect for printing cards or sharing on social media.' }
      ],
      seoContent: {
        title: 'Best Engagement Photographer in Patna',
        text: 'Looking for engagement photography in Patna that perfectly captures the start of your journey? Moments Studio is a leading engagement photographer in Patna, known for creative concepts and candid moments. We specialize in capturing real emotions and turning them into timeless memories.'
      }
    },
    'maternity': {
      title: 'Maternity Photography',
      subtitle: 'Embrace the Miracle of Life',
      description: 'Pregnancy is a beautiful, fleeting journey. Our maternity photography sessions are designed to make you feel comfortable, beautiful, and empowered. We capture the glowing anticipation of motherhood in serene indoor or outdoor settings.',
      mainImage: '/assets/images/about_us_page_1777525057236.png',
      portfolioItems: [
        { image: '/assets/images/about_us_page_1777525057236.png', title: 'A Mother\'s Glow', location: 'Patna', category: 'Maternity' },
        { image: '/assets/images/home1.png', title: 'Waiting for You', location: 'Patna', category: 'Maternity' }
      ],
      whyChooseUs: [
        { title: 'Comfort First', text: 'Relaxed sessions tailored to your pace.', icon: 'fas fa-couch' },
        { title: 'Wardrobe Guidance', text: 'Advice on outfits that flatter your bump beautifully.', icon: 'fas fa-tshirt' },
        { title: 'Timeless Aesthetic', text: 'Elegant lighting to highlight your natural glow.', icon: 'fas fa-sun' }
      ],
      faqs: [
        { question: 'When is the best time for a maternity shoot?', answer: 'We typically recommend shooting between 28-34 weeks when your bump is beautifully prominent but you are still comfortable moving around.' },
        { question: 'Can my partner and children join the session?', answer: 'Yes, we encourage family involvement to capture the shared excitement of the new arrival.' }
      ],
      seoContent: {
        title: 'Best Maternity Photographer in Patna',
        text: 'Looking for maternity photography in Patna that celebrates the miracle of life? Moments Studio is a leading maternity photographer in Patna, creating beautiful, empowered memories of your journey into motherhood.'
      }
    },
    'birthday': {
      title: 'Birthday Photography',
      subtitle: 'Joyful Moments, Colorful Memories',
      description: 'Whether it is a child’s first milestone or a grand 50th celebration, birthdays are meant to be remembered. We cover the decor, the excitement, the cake-cutting, and all the spontaneous fun, delivering vibrant and lively photographs.',
      mainImage: '/assets/images/home1.png',
      portfolioItems: [
        { image: '/assets/images/home1.png', title: 'One Year of Joy', location: 'Patna', category: 'Birthday' },
        { image: '/assets/images/about_us_page_1777525057236.png', title: 'Celebration Time', location: 'Patna', category: 'Birthday' }
      ],
      whyChooseUs: [
        { title: 'Vibrant Colors', text: 'Bright, cheerful editing styles to match the mood.', icon: 'fas fa-palette' },
        { title: 'Action Shots', text: 'Capturing the fun and energy of the party.', icon: 'fas fa-running' },
        { title: 'Detail Focus', text: 'We ensure the decor and cake get their moment.', icon: 'fas fa-birthday-cake' }
      ],
      faqs: [
        { question: 'How long do you stay at the party?', answer: 'Package durations vary, but typically we cover 2-4 hours to capture the main events and candid fun.' },
        { question: 'Do you provide same-day edits?', answer: 'We can provide 5-10 "highlight" photos within 24 hours for you to share on social media.' }
      ],
      seoContent: {
        title: 'Best Birthday Photographer in Patna',
        text: 'Looking for birthday photography in Patna that captures every joyful moment? Moments Studio is a leading birthday photographer in Patna, known for vibrant colors and lively photographs of your special celebrations.'
      }
    },
    'event': {
      title: 'Event Photography',
      subtitle: 'Professional Coverage for Every Occasion',
      description: 'From corporate galas to cultural festivals, our event photography provides comprehensive coverage of your occasion. We document key speakers, crowd interactions, and the overall atmosphere, providing high-quality images for your marketing or personal archives.',
      mainImage: '/assets/images/wedding_hero_1777525311142.png',
      portfolioItems: [
        { image: '/assets/images/wedding_hero_1777525311142.png', title: 'Corporate Gala', location: 'Patna', category: 'Event' },
        { image: '/assets/images/home1.png', title: 'Annual Meet', location: 'Patna', category: 'Event' }
      ],
      whyChooseUs: [
        { title: 'Comprehensive Coverage', text: 'We don’t miss a single crucial moment.', icon: 'fas fa-camera-retro' },
        { title: 'Professional Conduct', text: 'Unobtrusive shooting in corporate environments.', icon: 'fas fa-user-tie' },
        { title: 'High-Res Delivery', text: 'Images ready for print or digital marketing.', icon: 'fas fa-desktop' }
      ],
      faqs: [
        { question: 'How quickly can we get the event photos?', answer: 'Final edited galleries are typically delivered within 3-5 business days for corporate events.' },
        { question: 'Can you provide on-site printing?', answer: 'Yes, we can arrange for on-site photo printing or "instant" digital delivery for guests.' }
      ],
      seoContent: {
        title: 'Best Event Photographer in Patna',
        text: 'Looking for event photography in Patna that provides comprehensive coverage? Moments Studio is a leading event photographer in Patna, documenting key moments and atmospheres for your professional or personal occasions.'
      }
    }
  };

  startAutoSlide(): void {
    this.stopAutoSlide();
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  stopAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  loadServiceData(): void {
    if (this.servicesDB[this.serviceId]) {
      this.serviceData = this.servicesDB[this.serviceId];
    } else {
      // Fallback
      this.serviceData = this.servicesDB['wedding'];
    }
    this.currentSlideIndex = 0;
  }

  nextSlide(): void {
    if (this.serviceData) {
      const maxIndex = Math.max(0, this.serviceData.portfolioItems.length - 1);
      if (this.currentSlideIndex >= maxIndex) {
        this.currentSlideIndex = 0;
      } else {
        this.currentSlideIndex++;
      }
    }
  }

  prevSlide(): void {
    if (this.serviceData) {
      const maxIndex = Math.max(0, this.serviceData.portfolioItems.length - 1);
      if (this.currentSlideIndex <= 0) {
        this.currentSlideIndex = maxIndex;
      } else {
        this.currentSlideIndex--;
      }
    }
  }
}
