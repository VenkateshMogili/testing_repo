import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SinglePatientPaymentsComponent} from './single-patient-payments.component';

describe('SinglePatientPaymentsComponent', () => {
  let component: SinglePatientPaymentsComponent;
  let fixture: ComponentFixture<SinglePatientPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SinglePatientPaymentsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePatientPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
