import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthoritionComponent } from './authorition.component';

describe('AuthoritionComponent', () => {
  let component: AuthoritionComponent;
  let fixture: ComponentFixture<AuthoritionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthoritionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthoritionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
