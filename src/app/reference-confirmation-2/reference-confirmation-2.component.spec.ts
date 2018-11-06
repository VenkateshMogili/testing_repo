import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ReferenceConfirmation2Component} from './reference-confirmation-2.component';

describe('ReferenceConfirmation2Component', () => {
  let component: ReferenceConfirmation2Component;
  let fixture: ComponentFixture<ReferenceConfirmation2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReferenceConfirmation2Component]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceConfirmation2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
