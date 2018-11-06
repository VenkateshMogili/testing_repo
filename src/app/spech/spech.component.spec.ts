import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SpechComponent} from './spech.component';

describe('SpechComponent', () => {
  let component: SpechComponent;
  let fixture: ComponentFixture<SpechComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpechComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
