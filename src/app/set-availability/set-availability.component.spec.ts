import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SetAvailabilityComponent} from './set-availability.component';

describe('SetAvailabilityComponent', () => {
  let component: SetAvailabilityComponent;
  let fixture: ComponentFixture<SetAvailabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SetAvailabilityComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
