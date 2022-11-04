import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogPhotosComponent } from './dog-photos.component';

describe('DogPhotosComponent', () => {
  let component: DogPhotosComponent;
  let fixture: ComponentFixture<DogPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DogPhotosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DogPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
