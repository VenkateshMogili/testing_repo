import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DcontentComponent} from './dcontent.component';

describe('DcontentComponent', () => {
  let component: DcontentComponent;
  let fixture: ComponentFixture<DcontentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DcontentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
