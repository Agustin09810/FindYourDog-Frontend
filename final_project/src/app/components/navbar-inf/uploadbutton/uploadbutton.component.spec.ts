import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadbuttonComponent } from './uploadbutton.component';

describe('UploadbuttonComponent', () => {
  let component: UploadbuttonComponent;
  let fixture: ComponentFixture<UploadbuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadbuttonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
