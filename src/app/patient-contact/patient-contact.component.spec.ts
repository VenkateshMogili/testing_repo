import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PatientContactComponent} from './patient-contact.component';

describe('PatientContactComponent', () => {
  let component: PatientContactComponent;
  let fixture: ComponentFixture<PatientContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PatientContactComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
