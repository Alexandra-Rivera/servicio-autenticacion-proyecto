import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Logout } from './features/auth/logout/logout';
import { isLoggedInGuard, isLoggedOutGuard } from 'colibrihub-shared-components';
import { Home } from './features/home/home';
import {Signup} from './features/auth/signup/signup';
import {TwoStepVerification} from './features/auth/email-verification/two-step-verification/two-step-verification';
import {AuthSuccessfulMessage} from './features/auth/email-verification/auth-successful-message/auth-successful-message';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'login', component: Login, canMatch: [isLoggedOutGuard] },
  { path: 'logout', component: Logout, canMatch: [isLoggedInGuard] },
  { path: 'signup', component: Signup},
  { path: 'forgotten-password', loadChildren: () => import('../app/features/password-recovery/password-recovery.routes').then(c => c.PasswordRecoveryRoutes) },
  { path: 'two-step-verification', component: TwoStepVerification },
  { path: 'auth-successful', component: AuthSuccessfulMessage },
  { path: '**', redirectTo: 'home' }
];
