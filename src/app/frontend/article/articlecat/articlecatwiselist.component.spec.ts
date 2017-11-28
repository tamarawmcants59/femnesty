import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlecatwiselistComponent } from './articlecatwiselist.component';

describe('ArticlecatwiselistComponent', () => {
  let component: ArticlecatwiselistComponent;
  let fixture: ComponentFixture<ArticlecatwiselistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlecatwiselistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlecatwiselistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
