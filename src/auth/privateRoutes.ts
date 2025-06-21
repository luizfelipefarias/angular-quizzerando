import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../contexts/authContexts';

export const AuthGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return true; //usuário autenticado:libera a rota
  } else {
    router.navigate(['/login'], { replaceUrl: true }); //não autenticado:redireciona para login
    return false;
  }
};
