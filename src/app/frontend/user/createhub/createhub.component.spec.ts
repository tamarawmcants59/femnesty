import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatehubComponent } from './createhub.component';

describe('CreatehubComponent', () => {
  let component: CreatehubComponent;
  let fixture: ComponentFixture<CreatehubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatehubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatehubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
