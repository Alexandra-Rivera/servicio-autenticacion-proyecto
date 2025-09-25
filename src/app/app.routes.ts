import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Logout } from './features/auth/logout/logout';
import { isLoggedInGuard, isLoggedOutGuard } from 'colibrihub-shared-components';
import { Home } from './features/home/home';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'login', component: Login, canMatch: [isLoggedOutGuard] },
  { path: 'logout', component: Logout, canMatch: [isLoggedOutGuard] },
  { path: '**', redirectTo: 'home' }
];
