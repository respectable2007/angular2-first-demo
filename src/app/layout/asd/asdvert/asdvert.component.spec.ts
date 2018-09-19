import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsdvertComponent } from './asdvert.component';

describe('AsdvertComponent', () => {
  let component: AsdvertComponent;
  let fixture: ComponentFixture<AsdvertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsdvertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsdvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
