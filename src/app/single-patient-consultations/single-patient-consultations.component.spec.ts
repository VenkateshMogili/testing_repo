import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SinglePatientConsultationsComponent} from './single-patient-consultations.component';

describe('SinglePatientConsultationsComponent', () => {
  let component: SinglePatientConsultationsComponent;
  let fixture: ComponentFixture<SinglePatientConsultationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SinglePatientConsultationsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePatientConsultationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
