import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

// Guard som används för att skydda admin-sidorna så att endast inloggade användare kan komma åt dem
export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  // Om en token finns i local storage, åtkomst till sidan
  if(token) {
    return true;
  }

  // Om ingen token finna navigeras användaren till login-sidan
  router.navigate([
    '/admin/login'
  ]);

  return false;
};