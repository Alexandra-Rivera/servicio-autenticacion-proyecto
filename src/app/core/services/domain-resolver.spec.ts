import { TestBed } from '@angular/core/testing';

import { DomainResolverService } from './domain-resolver.service';

describe('DomainResolver', () => {
  let service: DomainResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DomainResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
