import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MycmplistComponent } from './mycmplist.component';

describe('MycmplistComponent', () => {
  let component: MycmplistComponent;
  let fixture: ComponentFixture<MycmplistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MycmplistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MycmplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
