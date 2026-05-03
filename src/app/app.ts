import { Component, signal } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, ChildrenOutletContexts } from '@angular/router';
import { HeaderComponent } from './components/header/header';
import { FooterComponent } from './components/footer/footer';
import { ToastComponent } from './components/toast/toast';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
//import { routeAnimations } from './animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ToastComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  //animations: [routeAnimations]
})
export class App {
  protected readonly title = signal('moments-studio');
  showLayout = true;
  isLoading = signal(true);

  constructor(
    private router: Router,
    private contexts: ChildrenOutletContexts
  ) {
    // Initial loader timeout
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1500);

    // Check initial URL immediately to prevent layout flashing
    const initialUrl = window.location.pathname;
    this.showLayout = !initialUrl.startsWith('/admin') && !initialUrl.startsWith('/feedback');

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.urlAfterRedirects;
      this.showLayout = !url.startsWith('/admin') && !url.startsWith('/feedback');

      // Always scroll to top on navigation
      if (typeof window !== 'undefined') {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant' // Immediate scroll to top
        });
      }
    });
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
