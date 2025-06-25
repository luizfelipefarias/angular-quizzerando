import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../app/services/contexts/authContexts';

export const AuthGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return true; // Usuário autenticado: libera a rota
  }

  router.navigate(['/login'], { replaceUrl: true }); // Redireciona para login
  return false; // Bloqueia o acesso
};
