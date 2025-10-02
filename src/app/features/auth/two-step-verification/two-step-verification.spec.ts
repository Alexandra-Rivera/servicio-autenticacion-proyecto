import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoStepVerification } from './two-step-verification';

describe('TwoStepVerification', () => {
  let component: TwoStepVerification;
  let fixture: ComponentFixture<TwoStepVerification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwoStepVerification]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoStepVerification);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
