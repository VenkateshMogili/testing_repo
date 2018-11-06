import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ReferenceConfirmation3Component} from './reference-confirmation-3.component';

describe('ReferenceConfirmation3Component', () => {
  let component: ReferenceConfirmation3Component;
  let fixture: ComponentFixture<ReferenceConfirmation3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReferenceConfirmation3Component]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceConfirmation3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
