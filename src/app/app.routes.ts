import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Logout } from './features/auth/logout/logout';
import { isLoggedInGuard, isLoggedOutGuard } from 'colibrihub-shared-components';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'login', component: Login, canMatch: [isLoggedOutGuard] },
    { path: 'logout', component: Logout, canMatch: [isLoggedInGuard] },
    { path: '**', redirectTo: '/'}
];
