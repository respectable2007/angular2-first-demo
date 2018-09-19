import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsdDetailComponent } from './asd-detail.component';

describe('AsdDetailComponent', () => {
  let component: AsdDetailComponent;
  let fixture: ComponentFixture<AsdDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsdDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsdDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
