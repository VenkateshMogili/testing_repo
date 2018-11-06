import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DoctorPricingComponent} from './doctor-pricing.component';

describe('DoctorPricingComponent', () => {
  let component: DoctorPricingComponent;
  let fixture: ComponentFixture<DoctorPricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorPricingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
