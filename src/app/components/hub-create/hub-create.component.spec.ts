import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HubCreateComponent } from './hub-create.component';

describe('HubCreateComponent', () => {
  let component: HubCreateComponent;
  let fixture: ComponentFixture<HubCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HubCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HubCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
