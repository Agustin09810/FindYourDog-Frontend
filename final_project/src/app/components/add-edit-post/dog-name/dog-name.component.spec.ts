import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogNameComponent } from './dog-name.component';

describe('DogNameComponent', () => {
  let component: DogNameComponent;
  let fixture: ComponentFixture<DogNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DogNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DogNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
