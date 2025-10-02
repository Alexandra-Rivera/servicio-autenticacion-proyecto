import {Component, OnInit, signal} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {LucideAngularModule, LucideLoaderCircle, LucideMailOpen} from 'lucide-angular';
import {NgClass} from '@angular/common';
@Component({
  selector: 'app-two-step-verification',
  imports: [ReactiveFormsModule, LucideAngularModule, NgClass],
  templateUrl: './two-step-verification.html',
  styleUrl: './two-step-verification.css'
})
export class TwoStepVerification implements OnInit{
  //Icons
  readonly mailOpen = LucideMailOpen;
  isLoading = signal(false);

  otpForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
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

      setTimeout(() => {
        this.isLoading.set(false);
        window.alert("It works!");
      }, 2000)

    }
  }

  protected readonly loaderCircle = LucideLoaderCircle;
}
