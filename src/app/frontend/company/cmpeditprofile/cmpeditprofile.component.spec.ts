import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmpeditprofileComponent } from './cmpeditprofile.component';

describe('CmpeditprofileComponent', () => {
  let component: CmpeditprofileComponent;
  let fixture: ComponentFixture<CmpeditprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmpeditprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmpeditprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
