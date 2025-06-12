import { TestBed } from '@angular/core/testing';

import { ContactDetailService } from './contact-detail.service';

describe('ContactDetailService', () => {
  let service: ContactDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
