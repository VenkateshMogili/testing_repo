import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SinglePendingConsultationsComponent} from './single-pending-consultations.component';

describe('SinglePendingConsultationsComponent', () => {
  let component: SinglePendingConsultationsComponent;
  let fixture: ComponentFixture<SinglePendingConsultationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SinglePendingConsultationsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePendingConsultationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
