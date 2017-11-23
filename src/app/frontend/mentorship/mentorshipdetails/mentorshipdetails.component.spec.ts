import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorshipdetailsComponent } from './mentorshipdetails.component';

describe('MentorshipdetailsComponent', () => {
  let component: MentorshipdetailsComponent;
  let fixture: ComponentFixture<MentorshipdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorshipdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorshipdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
