import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogGenderComponent } from './dog-gender.component';

describe('DogGenderComponent', () => {
  let component: DogGenderComponent;
  let fixture: ComponentFixture<DogGenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DogGenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DogGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
