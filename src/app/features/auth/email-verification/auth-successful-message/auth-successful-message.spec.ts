import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSuccessfulMessage } from './auth-successful-message';

describe('AuthSuccessfulMessage', () => {
  let component: AuthSuccessfulMessage;
  let fixture: ComponentFixture<AuthSuccessfulMessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthSuccessfulMessage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthSuccessfulMessage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
