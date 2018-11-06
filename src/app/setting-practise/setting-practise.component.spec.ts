import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingPractiseComponent} from './setting-practise.component';

describe('SettingPractiseComponent', () => {
  let component: SettingPractiseComponent;
  let fixture: ComponentFixture<SettingPractiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingPractiseComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingPractiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
