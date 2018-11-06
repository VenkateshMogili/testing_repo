import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfirmedConsultationsComponent} from './confirmed-consultations.component';

describe('ConfirmedConsultationsComponent', () => {
  let component: ConfirmedConsultationsComponent;
  let fixture: ComponentFixture<ConfirmedConsultationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmedConsultationsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmedConsultationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
