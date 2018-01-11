import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPrfrsidebarComponent } from './user-prfrsidebar.component';

describe('UserPrfrsidebarComponent', () => {
  let component: UserPrfrsidebarComponent;
  let fixture: ComponentFixture<UserPrfrsidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPrfrsidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPrfrsidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
