import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherUserPrfrsidebarComponent } from './other-user-prfrsidebar.component';

describe('UserPrfrsidebarComponent', () => {
  let component: OtherUserPrfrsidebarComponent;
  let fixture: ComponentFixture<OtherUserPrfrsidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherUserPrfrsidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherUserPrfrsidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
