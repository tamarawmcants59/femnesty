import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialhomeComponent } from './socialhome.component';

describe('SocialhomeComponent', () => {
  let component: SocialhomeComponent;
  let fixture: ComponentFixture<SocialhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
