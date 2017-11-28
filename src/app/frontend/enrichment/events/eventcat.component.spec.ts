import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventcatComponent } from './eventcat.component';

describe('EventcatComponent', () => {
  let component: EventcatComponent;
  let fixture: ComponentFixture<EventcatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventcatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventcatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
