import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard = () => {
  const router = inject(Router);
  if (typeof window !== 'undefined') {
    const isLoggedIn = sessionStorage.getItem('isLogin') === 'true';
    if (isLoggedIn) {
      return true;
    }
  }
  router.navigate(['/admin/login']);
  return false;
};
