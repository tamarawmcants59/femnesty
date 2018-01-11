import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupRightbarComponent } from './group-rightbar.component';

describe('GroupRightbarComponent', () => {
  let component: GroupRightbarComponent;
  let fixture: ComponentFixture<GroupRightbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupRightbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupRightbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
