import { TestBed } from '@angular/core/testing';

import { ProcessResultService } from './process-result.service';

describe('ProcessResultService', () => {
  let service: ProcessResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
