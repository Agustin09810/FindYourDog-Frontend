import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Image } from './interfaces/Image';
import { Zone } from './interfaces/Zone';



@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {

  constructor() { }

  createDb() {
    const images: Image[] = [
      { imageId: '1', imageUrl: '../assets/images/img3.jpg' },
      { imageId: '2', imageUrl: 'Dr Nice' },
      { imageId: '3', imageUrl: 'Dr Nice' },
      { imageId: '4', imageUrl: 'Dr Nice' },
      { imageId: '5', imageUrl: 'Dr Nice' }
    ];
    return {images};
  }
}
