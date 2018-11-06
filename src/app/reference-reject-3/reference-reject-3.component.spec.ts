import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ReferenceReject3Component} from './reference-reject-3.component';

describe('ReferenceReject3Component', () => {
  let component: ReferenceReject3Component;
  let fixture: ComponentFixture<ReferenceReject3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReferenceReject3Component]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceReject3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
