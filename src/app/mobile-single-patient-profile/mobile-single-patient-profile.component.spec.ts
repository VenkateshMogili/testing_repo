import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSinglePatientProfileComponent } from './mobile-single-patient-profile.component';

describe('MobileSinglePatientProfileComponent', () => {
  let component: MobileSinglePatientProfileComponent;
  let fixture: ComponentFixture<MobileSinglePatientProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileSinglePatientProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileSinglePatientProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
