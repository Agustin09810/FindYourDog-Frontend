import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarSupComponent } from './navbar-sup.component';

describe('NavbarSupComponent', () => {
  let component: NavbarSupComponent;
  let fixture: ComponentFixture<NavbarSupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarSupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarSupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
