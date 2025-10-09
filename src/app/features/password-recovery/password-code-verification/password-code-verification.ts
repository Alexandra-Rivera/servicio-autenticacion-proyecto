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
import {HotToastService} from '@ngxpert/hot-toast';
import {ConfirmAccountDto} from '../../../models/confirm-account-dto';
import {NgClass} from '@angular/common';

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
  emailDto!: EmailDto;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private toast: HotToastService
  ) {
  };

  ngOnInit(): void {
    this.otpForm = this.fb.group({
      otp1: ['', [Validators.required, Validators.pattern('\\d')]],
      otp2: ['', [Validators.required, Validators.pattern('\\d')]],
      otp3: ['', [Validators.required, Validators.pattern('\\d')]],
      otp4: ['', [Validators.required, Validators.pattern('\\d')]],
      otp5: ['', [Validators.required, Validators.pattern('\\d')]],
      otp6: ['', [Validators.required, Validators.pattern('\\d')]],
    });

    this.emailDto = {
      email: this.accountService.getCurrentEmail(),
    };

    console.log("emailDto", this.emailDto);

    this.accountService.sendVerificationCode(this.emailDto).subscribe();
  }

  moveFocus(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.value.length === 1 && index < 6) {
      (document.querySelectorAll('input')[index] as HTMLInputElement).focus();
    }
  }

  onSubmit(): void {
    if (this.otpForm.valid) {
      if (this.isLoading()) return;

      this.isLoading.set(true);

      const valoresOTP: string[] = Object.values(this.otpForm.value) as string[];
      const verificationCode: string = valoresOTP.join('');

      const confirmAccountDto: ConfirmAccountDto = {
        email: this.emailDto.email,
        code: verificationCode,
      }

      setTimeout(() => {
        this.isLoading.set(false);

        this.router.navigate(['forgotten-password/reset-password']);
        // this.accountService.saveUser(confirmAccountDto).subscribe(
        //   {
        //     next: () => {
        //       this.toast.success("Cuenta verificada con éxito, inicia sesión para usar las funciones del sistema")
        //
        //       this.router.navigate(['/auth-successful']);
        //     }
        //   }
        // )
      }, 2000)

    }
  }
}
