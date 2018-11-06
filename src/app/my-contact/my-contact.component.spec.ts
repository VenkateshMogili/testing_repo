import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyContactComponent } from './my-contact.component';

describe('MyContactComponent', () => {
  let component: MyContactComponent;
  let fixture: ComponentFixture<MyContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
