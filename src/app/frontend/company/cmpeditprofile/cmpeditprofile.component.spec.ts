import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmpEditprofileComponent } from './cmpeditprofile.component';

describe('CmpeditprofileComponent', () => {
  let component: CmpEditprofileComponent;
  let fixture: ComponentFixture<CmpEditprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmpEditprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmpEditprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
