import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PendingConsultationsComponent} from './pending-consultations.component';

describe('PendingConsultationsComponent', () => {
  let component: PendingConsultationsComponent;
  let fixture: ComponentFixture<PendingConsultationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PendingConsultationsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingConsultationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
