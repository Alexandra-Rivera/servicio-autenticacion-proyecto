import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionButton } from './session-button';

describe('SessionButton', () => {
  let component: SessionButton;
  let fixture: ComponentFixture<SessionButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
