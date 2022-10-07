import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogsGridComponent } from './dogs-grid.component';

describe('DogsGridComponent', () => {
  let component: DogsGridComponent;
  let fixture: ComponentFixture<DogsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DogsGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DogsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
