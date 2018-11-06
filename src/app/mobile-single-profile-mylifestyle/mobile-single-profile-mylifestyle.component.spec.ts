import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSingleProfileMylifestyleComponent } from './mobile-single-profile-mylifestyle.component';

describe('MobileSingleProfileMylifestyleComponent', () => {
  let component: MobileSingleProfileMylifestyleComponent;
  let fixture: ComponentFixture<MobileSingleProfileMylifestyleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileSingleProfileMylifestyleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileSingleProfileMylifestyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
