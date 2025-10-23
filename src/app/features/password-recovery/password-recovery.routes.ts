import {Routes} from '@angular/router';
import {PasswordCodeVerification} from './password-code-verification/password-code-verification';
import {ResetPassword} from './reset-password/reset-password';
import {ForgottenPassword} from './forgotten-password/forgotten-password';
import {SuccessMessage} from './success-message/success-message';

export const PasswordRecoveryRoutes: Routes = [
  { path: '', component: ForgottenPassword },
  { path: 'two-step-verification', component: PasswordCodeVerification },
  { path: 'reset-password', component: ResetPassword },
  { path: 'success', component: SuccessMessage },
]
