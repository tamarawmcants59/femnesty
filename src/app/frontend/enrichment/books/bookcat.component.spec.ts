import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookcatComponent } from './bookcat.component';

describe('BookcatComponent', () => {
  let component: BookcatComponent;
  let fixture: ComponentFixture<BookcatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookcatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookcatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
