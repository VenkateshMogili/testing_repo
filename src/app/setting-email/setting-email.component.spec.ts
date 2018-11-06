import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingEmailComponent} from './setting-email.component';

describe('SettingEmailComponent', () => {
  let component: SettingEmailComponent;
  let fixture: ComponentFixture<SettingEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingEmailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
