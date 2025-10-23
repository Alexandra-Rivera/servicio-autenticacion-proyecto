import { TestBed } from '@angular/core/testing';

import { CodeVerificationService } from './code-verification.service';

describe('CodeVerificationService', () => {
  let service: CodeVerificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeVerificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
