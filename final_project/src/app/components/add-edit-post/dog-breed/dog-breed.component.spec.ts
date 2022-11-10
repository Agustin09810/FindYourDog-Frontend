import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogBreedComponent } from './dog-breed.component';

describe('DogBreedComponent', () => {
  let component: DogBreedComponent;
  let fixture: ComponentFixture<DogBreedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DogBreedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DogBreedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
