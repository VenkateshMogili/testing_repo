import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ReferenceReject2Component} from './reference-reject-2.component';

describe('ReferenceReject2Component', () => {
  let component: ReferenceReject2Component;
  let fixture: ComponentFixture<ReferenceReject2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReferenceReject2Component]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceReject2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
