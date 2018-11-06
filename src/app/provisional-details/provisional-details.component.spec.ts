import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProvisionalDetailsComponent} from './provisional-details.component';

describe('ProvisionalDetailsComponent', () => {
  let component: ProvisionalDetailsComponent;
  let fixture: ComponentFixture<ProvisionalDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProvisionalDetailsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvisionalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
