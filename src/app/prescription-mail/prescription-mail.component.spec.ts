import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PrescriptionMailComponent} from './prescription-mail.component';

describe('PrescriptionMailComponent', () => {
  let component: PrescriptionMailComponent;
  let fixture: ComponentFixture<PrescriptionMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrescriptionMailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
