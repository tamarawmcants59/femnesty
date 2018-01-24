import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetaRestrictionComponent } from './beta-restriction.component';

describe('BetaRestrictionComponent', () => {
  let component: BetaRestrictionComponent;
  let fixture: ComponentFixture<BetaRestrictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetaRestrictionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetaRestrictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
