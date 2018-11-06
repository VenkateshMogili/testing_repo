import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLifeStyleComponent } from './my-life-style.component';

describe('MyLifeStyleComponent', () => {
  let component: MyLifeStyleComponent;
  let fixture: ComponentFixture<MyLifeStyleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyLifeStyleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyLifeStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
