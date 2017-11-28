import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventcatlistComponent } from './eventcatlist.component';

describe('EventcatlistComponent', () => {
  let component: EventcatlistComponent;
  let fixture: ComponentFixture<EventcatlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventcatlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventcatlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
