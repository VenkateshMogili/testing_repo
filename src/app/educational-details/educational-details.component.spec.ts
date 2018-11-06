import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EducationalDetailsComponent} from './educational-details.component';

describe('EducationalDetailsComponent', () => {
  let component: EducationalDetailsComponent;
  let fixture: ComponentFixture<EducationalDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EducationalDetailsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
