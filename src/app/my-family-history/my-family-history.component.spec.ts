import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFamilyHistoryComponent } from './my-family-history.component';

describe('MyFamilyHistoryComponent', () => {
  let component: MyFamilyHistoryComponent;
  let fixture: ComponentFixture<MyFamilyHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFamilyHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFamilyHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
