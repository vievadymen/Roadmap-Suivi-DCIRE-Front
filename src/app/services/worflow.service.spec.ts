import { TestBed } from '@angular/core/testing';

import { WorflowService } from './worflow.service';

describe('WorflowService', () => {
  let service: WorflowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorflowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
