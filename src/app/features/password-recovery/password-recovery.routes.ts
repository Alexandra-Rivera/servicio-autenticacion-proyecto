import {Routes} from '@angular/router';
import {PasswordCodeVerification} from './password-code-verification/password-code-verification';
import {ResetPassword} from './reset-password/reset-password';
import {ForgottenPassword} from './forgotten-password/forgotten-password';
import {SuccessMessage} from './success-message/success-message';

export const PasswordRecoveryRoutes: Routes = [
  { path: '', component: ForgottenPassword, title: 'Recuperación de contraseña' },
  { path: 'two-step-verification', component: PasswordCodeVerification, title: 'Código de verificación' },
  { path: 'reset-password', component: ResetPassword, title: 'Recuperación de contraseña' },
  { path: 'success', component: SuccessMessage, title: 'Recuperación de contraseña' },
]
