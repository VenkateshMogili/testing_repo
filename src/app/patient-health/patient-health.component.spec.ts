import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PatientHealthComponent} from './patient-health.component';

describe('PatientHealthComponent', () => {
  let component: PatientHealthComponent;
  let fixture: ComponentFixture<PatientHealthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PatientHealthComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
