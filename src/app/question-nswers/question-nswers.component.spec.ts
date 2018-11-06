import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {QuestionNswersComponent} from './question-nswers.component';

describe('QuestionNswersComponent', () => {
  let component: QuestionNswersComponent;
  let fixture: ComponentFixture<QuestionNswersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionNswersComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionNswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
