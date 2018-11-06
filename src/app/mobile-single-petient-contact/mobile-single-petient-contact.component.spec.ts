import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSinglePetientContactComponent } from './mobile-single-petient-contact.component';

describe('MobileSinglePetientContactComponent', () => {
  let component: MobileSinglePetientContactComponent;
  let fixture: ComponentFixture<MobileSinglePetientContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileSinglePetientContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileSinglePetientContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
