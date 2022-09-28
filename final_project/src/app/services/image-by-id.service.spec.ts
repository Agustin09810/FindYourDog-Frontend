import { TestBed } from '@angular/core/testing';

import { ImageByIdService } from './image-by-id.service';

describe('ImageByIdService', () => {
  let service: ImageByIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageByIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
