import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SinglePatientComponent} from './single-patient.component';

describe('SinglePatientComponent', () => {
  let component: SinglePatientComponent;
  let fixture: ComponentFixture<SinglePatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SinglePatientComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
