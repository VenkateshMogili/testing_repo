import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomecontentComponent} from './homecontent.component';

describe('HomecontentComponent', () => {
  let component: HomecontentComponent;
  let fixture: ComponentFixture<HomecontentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomecontentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomecontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
