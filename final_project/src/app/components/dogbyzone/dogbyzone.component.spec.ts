import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogbyzoneComponent } from './dogbyzone.component';

describe('DogbyzoneComponent', () => {
  let component: DogbyzoneComponent;
  let fixture: ComponentFixture<DogbyzoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DogbyzoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DogbyzoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
