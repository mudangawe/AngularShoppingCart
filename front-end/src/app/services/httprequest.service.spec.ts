import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing'
import { HTTPRequestService } from './httprequest.service';

describe('HTTPRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: HTTPRequestService = TestBed.get(HTTPRequestService);
    expect(service).toBeTruthy();
  });
});
