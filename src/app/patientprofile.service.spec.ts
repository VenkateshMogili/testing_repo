import {inject, TestBed} from '@angular/core/testing';

import {PatientprofileService} from './patientprofile.service';

describe('PatientprofileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatientprofileService]
    });
  });

  it('should be created', inject([PatientprofileService], (service: PatientprofileService) => {
    expect(service).toBeTruthy();
  }));
});
