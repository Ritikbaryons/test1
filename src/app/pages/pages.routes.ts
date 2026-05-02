import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { AboutComponent } from './about/about';
import { ServicesComponent } from './services/services';
import { GalleryComponent } from './gallery/gallery';
import { FilmsComponent } from './films/films';
import { ContactComponent } from './contact/contact';
import { ServiceDetailComponent } from './service-detail/service-detail';

export const PAGES_ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'service/:id', component: ServiceDetailComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'films', component: FilmsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'feedback/:token', loadComponent: () => import('./feedback/feedback').then(m => m.FeedbackComponent) },
];
