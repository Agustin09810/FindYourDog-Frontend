import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogDateZoneComponent } from './dog-date-zone.component';

describe('DogDateZoneComponent', () => {
  let component: DogDateZoneComponent;
  let fixture: ComponentFixture<DogDateZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DogDateZoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DogDateZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
