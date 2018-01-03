import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupphotoComponent } from './groupphoto.component';

describe('GroupphotoComponent', () => {
  let component: GroupphotoComponent;
  let fixture: ComponentFixture<GroupphotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupphotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupphotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
