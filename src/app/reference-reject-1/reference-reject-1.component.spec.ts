import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ReferenceReject1Component} from './reference-reject-1.component';

describe('ReferenceReject1Component', () => {
  let component: ReferenceReject1Component;
  let fixture: ComponentFixture<ReferenceReject1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReferenceReject1Component]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceReject1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
