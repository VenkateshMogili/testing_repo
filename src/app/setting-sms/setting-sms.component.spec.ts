import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingSmsComponent} from './setting-sms.component';

describe('SettingSmsComponent', () => {
  let component: SettingSmsComponent;
  let fixture: ComponentFixture<SettingSmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingSmsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
