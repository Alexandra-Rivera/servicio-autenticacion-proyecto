import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordCodeVerification } from './password-code-verification';

describe('PasswordCodeVerification', () => {
  let component: PasswordCodeVerification;
  let fixture: ComponentFixture<PasswordCodeVerification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordCodeVerification]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordCodeVerification);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
