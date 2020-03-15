import { TestBed } from '@angular/core/testing';

import { AuthoCookiesHandlerService } from './autho-cookies-handler.service';

describe('AuthoCookiesHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthoCookiesHandlerService = TestBed.get(AuthoCookiesHandlerService);
    expect(service).toBeTruthy();
  });
});
