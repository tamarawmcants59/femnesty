import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationlinkComponent } from './activationlink.component';

describe('ActivationlinkComponent', () => {
  let component: ActivationlinkComponent;
  let fixture: ComponentFixture<ActivationlinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivationlinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivationlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
