import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherAllphotoComponent } from './other-allphoto.component';

describe('OtherAllphotoComponent', () => {
  let component: OtherAllphotoComponent;
  let fixture: ComponentFixture<OtherAllphotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherAllphotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherAllphotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
