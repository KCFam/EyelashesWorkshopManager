import { TestBed } from '@angular/core/testing';

import { LashtoolService } from './lashtool.service';

describe('LashtoolService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LashtoolService = TestBed.get(LashtoolService);
    expect(service).toBeTruthy();
  });
});
