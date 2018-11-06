import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ReferenceConfirmation1Component} from './reference-confirmation-1.component';

describe('ReferenceConfirmation1Component', () => {
  let component: ReferenceConfirmation1Component;
  let fixture: ComponentFixture<ReferenceConfirmation1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReferenceConfirmation1Component]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceConfirmation1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
