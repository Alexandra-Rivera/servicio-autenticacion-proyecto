import {Component, OnInit, signal} from '@angular/core';
import {
  LucideAngularModule,
  LucideLoaderCircle,
  ShieldEllipsis
} from 'lucide-angular';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {EmailDto} from '../../../models/email-dto';
import {AccountService} from '../../../core/services/account.service';
import {NgClass} from '@angular/common';
import {CodeVerificationService} from '../../../shared/services/code-verification.service';
import {EmailValueService} from '../../../shared/services/email-value.service';
import {HotToastService} from '@ngxpert/hot-toast';

@Component({
  selector: 'app-password-code-verification',
  imports: [ReactiveFormsModule, LucideAngularModule, NgClass],
  templateUrl: './password-code-verification.html',
  styleUrl: './password-code-verification.css'
})
export class PasswordCodeVerification implements OnInit {
  //Icons
  readonly loaderCircle = LucideLoaderCircle;
  readonly ShieldEllipsis = ShieldEllipsis;

  isLoading = signal(false);

  otpForm!: FormGroup;
  emailDto: EmailDto = {
    email: '',
  };

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private emailValueService: EmailValueService,
    private codeVerificationService: CodeVerificationService,
    private router: Router,
    private toast: HotToastService
  ) {
  };

  ngOnInit() {
    this.otpForm = this.fb.group({
      otp1: ['', [Validators.required, Validators.pattern('\\d')]],
      otp2: ['', [Validators.required, Validators.pattern('\\d')]],
      otp3: ['', [Validators.required, Validators.pattern('\\d')]],
      otp4: ['', [Validators.required, Validators.pattern('\\d')]],
      otp5: ['', [Validators.required, Validators.pattern('\\d')]],
      otp6: ['', [Validators.required, Validators.pattern('\\d')]],
    });

    this.emailDto = {
      email: this.emailValueService.getCurrentEmail()
    };
  }

  moveFocus(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.value.length === 1 && index < 6) {
      (document.querySelectorAll('input')[index] as HTMLInputElement).focus();
    }
  }

  sendVerificationCode() {
    this.accountService.recoverPassword(this.emailDto).subscribe({
      next: (res) => {
        this.toast.success(res.message);
      },
      error: (err) => {
        console.error(err);
        this.toast.error(err.error.message);
      }
    });
  }

  onSubmit(): void {
    if (this.otpForm.valid) {
      if (this.isLoading()) return;

      this.isLoading.set(true);

      const valoresOTP: string[] = Object.values(this.otpForm.value) as string[];
      const verificationCode: string = valoresOTP.join('');

      this.codeVerificationService.setPasswordVerificationCode(verificationCode);

      setTimeout(() => {
        this.isLoading.set(false);
        this.router.navigate(['forgotten-password/reset-password']);
      }, 2000)

    }
  }
}
