import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Logout } from './features/auth/logout/logout';
import { isLoggedInGuard, isLoggedOutGuard } from 'colibrihub-shared-components';
import { Home } from './features/home/home';
import {ForgottenPassword} from './features/forgotten-password/forgotten-password';
import {Signup} from './features/auth/signup/signup';
import {TwoStepVerification} from './features/auth/two-step-verification/two-step-verification';
import {AuthSuccessfulMessage} from './features/auth-successful-message/auth-successful-message';
import {ResetPassword} from './features/reset-password/reset-password';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'login', component: Login, canMatch: [isLoggedOutGuard] },
  { path: 'logout', component: Logout, canMatch: [isLoggedInGuard] },
  { path: 'signup', component: Signup},
  { path: 'forgotten-password', component: ForgottenPassword},
  { path: 'two-step-verification', component: TwoStepVerification },
  { path: 'auth-successful', component: AuthSuccessfulMessage },
  { path: 'reset-password', component: ResetPassword },
  { path: '**', redirectTo: 'home' }
];
