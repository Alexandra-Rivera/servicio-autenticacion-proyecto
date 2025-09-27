import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Logout } from './features/auth/logout/logout';
import { isLoggedInGuard, isLoggedOutGuard } from 'colibrihub-shared-components';
import { Home } from './features/home/home';
import {ForgottenPassword} from './features/forgotten-password/forgotten-password';
import {Signup} from './features/auth/signup/signup';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'login', component: Login, canMatch: [isLoggedOutGuard] },
  { path: 'logout', component: Logout, canMatch: [isLoggedInGuard] },
  { path: 'forgotten-password', component: ForgottenPassword},
  { path: 'signup', component: Signup},
  { path: '**', redirectTo: 'home' }
];
