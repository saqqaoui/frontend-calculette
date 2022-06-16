import { TestBed } from '@angular/core/testing';

import { CalculateService } from './calculate.service';

describe('CalculService', () => {
  let service: CalculateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
