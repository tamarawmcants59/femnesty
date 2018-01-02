import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowsehubComponent } from './browsehub.component';

describe('BrowsehubComponent', () => {
  let component: BrowsehubComponent;
  let fixture: ComponentFixture<BrowsehubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowsehubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowsehubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
