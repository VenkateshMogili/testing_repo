import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SuccessProvisionalComponent} from './success-provisional.component';

describe('SuccessProvisionalComponent', () => {
  let component: SuccessProvisionalComponent;
  let fixture: ComponentFixture<SuccessProvisionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SuccessProvisionalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessProvisionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
