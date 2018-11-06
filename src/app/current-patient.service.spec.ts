import {inject, TestBed} from '@angular/core/testing';

import {CurrentPatientService} from './current-patient.service';

describe('CurrentPatientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentPatientService]
    });
  });

  it('should be created', inject([CurrentPatientService], (service: CurrentPatientService) => {
    expect(service).toBeTruthy();
  }));
});
