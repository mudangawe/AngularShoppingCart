import { TestBed } from '@angular/core/testing';

import { IteamsService } from './iteams.service';

describe('IteamsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IteamsService = TestBed.get(IteamsService);
    expect(service).toBeTruthy();
  });
});
