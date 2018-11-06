import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SinglePatientReportsComponent} from './single-patient-reports.component';

describe('SinglePatientReportsComponent', () => {
  let component: SinglePatientReportsComponent;
  let fixture: ComponentFixture<SinglePatientReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SinglePatientReportsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePatientReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
