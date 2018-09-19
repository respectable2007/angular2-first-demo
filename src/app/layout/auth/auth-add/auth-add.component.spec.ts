import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthAddComponent } from './auth-add.component';

describe('AuthAddComponent', () => {
  let component: AuthAddComponent;
  let fixture: ComponentFixture<AuthAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
