import { TestBed } from '@angular/core/testing';

import { EmailValueService } from './email-value.service';

describe('EmailValueService', () => {
  let service: EmailValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
