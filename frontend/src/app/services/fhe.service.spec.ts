import { TestBed } from '@angular/core/testing';

import { FheService } from './fhe.service';

describe('FheService', () => {
  let service: FheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
