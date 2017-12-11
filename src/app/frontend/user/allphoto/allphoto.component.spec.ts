import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllphotoComponent } from './allphoto.component';

describe('AllphotoComponent', () => {
  let component: AllphotoComponent;
  let fixture: ComponentFixture<AllphotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllphotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllphotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
