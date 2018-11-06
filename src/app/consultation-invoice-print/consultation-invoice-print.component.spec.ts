import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ConsultationInvoicePrintComponent} from './consultation-invoice-print.component';

describe('ConsultationInvoicePrintComponent', () => {
  let component: ConsultationInvoicePrintComponent;
  let fixture: ComponentFixture<ConsultationInvoicePrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultationInvoicePrintComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationInvoicePrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
