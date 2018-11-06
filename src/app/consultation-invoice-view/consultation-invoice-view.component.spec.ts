import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ConsultationInvoiceViewComponent} from './consultation-invoice-view.component';

describe('ConsultationInvoiceViewComponent', () => {
  let component: ConsultationInvoiceViewComponent;
  let fixture: ComponentFixture<ConsultationInvoiceViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultationInvoiceViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationInvoiceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
