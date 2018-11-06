import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DoctorPricingAutomaticComponent} from './doctor-pricing-automatic.component';

describe('DoctorPricingAutomaticComponent', () => {
  let component: DoctorPricingAutomaticComponent;
  let fixture: ComponentFixture<DoctorPricingAutomaticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorPricingAutomaticComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorPricingAutomaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
