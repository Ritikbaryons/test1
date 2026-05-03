import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { AdminLayoutComponent } from './admin-layout/admin-layout';
import { DashboardComponent } from './dashboard/dashboard';
import { ImageManagerComponent } from './image-manager/image-manager';
import { VideoManagerComponent } from './video-manager/video-manager';
import { FeedbackManagerComponent } from './feedback-manager/feedback-manager';
import { ContactInquiriesComponent } from './contact-inquiries/contact-inquiries';

import { authGuard } from '../services/auth.guard';

export const ADMIN_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'images', component: ImageManagerComponent },
      { path: 'videos', component: VideoManagerComponent },
      { path: 'feedback', component: FeedbackManagerComponent },
      { path: 'inquiries', component: ContactInquiriesComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];
