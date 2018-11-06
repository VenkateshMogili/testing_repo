import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PatientLifestyleComponent} from './patient-lifestyle.component';

describe('PatientLifestyleComponent', () => {
  let component: PatientLifestyleComponent;
  let fixture: ComponentFixture<PatientLifestyleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PatientLifestyleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientLifestyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
