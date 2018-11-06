import {inject, TestBed} from '@angular/core/testing';

import {AuthenticationserviceService} from './authenticationservice.service';

describe('AuthenticationserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationserviceService]
    });
  });

  it('should be created', inject([AuthenticationserviceService], (service: AuthenticationserviceService) => {
    expect(service).toBeTruthy();
  }));
});
