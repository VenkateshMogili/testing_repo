import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SinglePatientPrescriptionsComponent} from './single-patient-prescriptions.component';

describe('SinglePatientPrescriptionsComponent', () => {
  let component: SinglePatientPrescriptionsComponent;
  let fixture: ComponentFixture<SinglePatientPrescriptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SinglePatientPrescriptionsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePatientPrescriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
