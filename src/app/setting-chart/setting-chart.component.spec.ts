import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingChartComponent} from './setting-chart.component';

describe('SettingChartComponent', () => {
  let component: SettingChartComponent;
  let fixture: ComponentFixture<SettingChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingChartComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
