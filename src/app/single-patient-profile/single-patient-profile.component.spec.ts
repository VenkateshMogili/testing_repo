import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SinglePatientProfileComponent} from './single-patient-profile.component';

describe('SinglePatientProfileComponent', () => {
  let component: SinglePatientProfileComponent;
  let fixture: ComponentFixture<SinglePatientProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SinglePatientProfileComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePatientProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
