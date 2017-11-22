import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyRightbarComponent } from './company-rightbar.component';

describe('CompanyRightbarComponent', () => {
  let component: CompanyRightbarComponent;
  let fixture: ComponentFixture<CompanyRightbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyRightbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyRightbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
