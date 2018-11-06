import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingPasswordComponent} from './setting-password.component';

describe('SettingPasswordComponent', () => {
  let component: SettingPasswordComponent;
  let fixture: ComponentFixture<SettingPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingPasswordComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
