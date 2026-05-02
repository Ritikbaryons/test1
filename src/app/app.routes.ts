import { Routes } from '@angular/router';
import { PAGES_ROUTES } from './pages/pages.routes';
import { ADMIN_ROUTES } from './adminpage/admin.routes';

export const routes: Routes = [
  ...PAGES_ROUTES,
  { 
    path: 'admin', 
    children: ADMIN_ROUTES 
  },
  { path: '**', redirectTo: '' }
];

