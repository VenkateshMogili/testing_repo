import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditHospitalComponent} from './edit-hospital.component';

describe('EditHospitalComponent', () => {
  let component: EditHospitalComponent;
  let fixture: ComponentFixture<EditHospitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditHospitalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
