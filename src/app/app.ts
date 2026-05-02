import { Component, signal } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './components/header/header';
import { FooterComponent } from './components/footer/footer';
import { ToastComponent } from './components/toast/toast';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ToastComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('moments-studio');
  showLayout = true;

  constructor(private router: Router) {
    // Check initial URL immediately to prevent layout flashing
    const initialUrl = window.location.pathname;
    this.showLayout = !initialUrl.startsWith('/admin') && !initialUrl.startsWith('/feedback');

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.urlAfterRedirects;
      this.showLayout = !url.startsWith('/admin') && !url.startsWith('/feedback');
    });
  }
}
