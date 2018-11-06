import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSinglePetientMyhealthComponent } from './mobile-single-petient-myhealth.component';

describe('MobileSinglePetientMyhealthComponent', () => {
  let component: MobileSinglePetientMyhealthComponent;
  let fixture: ComponentFixture<MobileSinglePetientMyhealthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileSinglePetientMyhealthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileSinglePetientMyhealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
