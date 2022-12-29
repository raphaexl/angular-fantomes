import { TestBed } from '@angular/core/testing';

import { FantomeService } from './fantome.service';

describe('FantomeService', () => {
  let service: FantomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FantomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
