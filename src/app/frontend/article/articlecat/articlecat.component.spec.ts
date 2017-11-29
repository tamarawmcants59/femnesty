import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlecatComponent } from './articlecat.component';

describe('ArticlecatComponent', () => {
  let component: ArticlecatComponent;
  let fixture: ComponentFixture<ArticlecatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlecatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlecatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
