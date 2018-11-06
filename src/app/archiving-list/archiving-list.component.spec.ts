import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ArchivingListComponent} from './archiving-list.component';

describe('ArchivingListComponent', () => {
  let component: ArchivingListComponent;
  let fixture: ComponentFixture<ArchivingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArchivingListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
