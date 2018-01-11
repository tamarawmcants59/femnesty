import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupLeftbarComponent } from './group-leftbar.component';

describe('GroupLeftbarComponent', () => {
  let component: GroupLeftbarComponent;
  let fixture: ComponentFixture<GroupLeftbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupLeftbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupLeftbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
