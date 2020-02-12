import { TestBed } from '@angular/core/testing';

import { HTTPRequestService } from './httprequest.service';

describe('HTTPRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HTTPRequestService = TestBed.get(HTTPRequestService);
    expect(service).toBeTruthy();
  });
});
