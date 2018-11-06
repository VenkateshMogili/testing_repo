import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PatientFamilyhistoryComponent} from './patient-familyhistory.component';

describe('PatientFamilyhistoryComponent', () => {
  let component: PatientFamilyhistoryComponent;
  let fixture: ComponentFixture<PatientFamilyhistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PatientFamilyhistoryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientFamilyhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
