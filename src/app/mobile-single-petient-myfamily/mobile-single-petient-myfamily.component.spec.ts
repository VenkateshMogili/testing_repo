import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSinglePetientMyfamilyComponent } from './mobile-single-petient-myfamily.component';

describe('MobileSinglePetientMyfamilyComponent', () => {
  let component: MobileSinglePetientMyfamilyComponent;
  let fixture: ComponentFixture<MobileSinglePetientMyfamilyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileSinglePetientMyfamilyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileSinglePetientMyfamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
