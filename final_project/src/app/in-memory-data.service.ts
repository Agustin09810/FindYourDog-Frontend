import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Image } from './interfaces/Image';
import { User } from './interfaces/User';
import { Zone } from './interfaces/Zone';
import { Post } from './interfaces/Post';



@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {

  constructor() { }

  createDb() {
    const images: Image[] = [
      { imageId: '1', imageUrl: '../assets/images/img3.jpg' },
      { imageId: '2', imageUrl: '../assets/images/img3.jpg' },
      { imageId: '3', imageUrl: '../assets/images/img3.jpg' },
      { imageId: '4', imageUrl: '../assets/images/img3.jpg' },
      { imageId: '5', imageUrl: '../assets/images/img3.jpg' },
      { imageId: '6', imageUrl: '../assets/images/img3.jpg' },
      { imageId: '7', imageUrl: '../assets/images/img3.jpg' },
      { imageId: '8', imageUrl: '../assets/images/img3.jpg' },
      { imageId: '9', imageUrl: '../assets/images/img3.jpg' },
      { imageId: '10', imageUrl: '../assets/images/dogs/dog1.jpg' },
      { imageId: '11', imageUrl: '../assets/images/dogs/dog2.jpg' },
      { imageId: '12', imageUrl: '../assets/images/dogs/dog3.jpg' },
      { imageId: '13', imageUrl: '../assets/images/dogs/dog3_1.jpg' }
    ];
    const zones: Zone[] = [
      {imgId:'1', name:'name1', id:'1', posts: ['1']},
      {imgId:'2', name:'name2', id:'2', posts: ['2']},
      {imgId:'3', name:'name3', id:'3', posts: ['3']},
      {imgId:'4', name:'name4', id:'4', posts: []},
      {imgId:'5', name:'name5', id:'5', posts: []},
      {imgId:'6', name:'name6', id:'6', posts: []},
      {imgId:'7', name:'name7', id:'7', posts: []},
      {imgId:'8', name:'name8', id:'8', posts: []},
      {imgId:'9', name:'name9', id:'9', posts: []}
    ]

    const users: User[] = [
      {username:'admin', password:'admin'},
      {username:'wea123', password:'wea123'}
    ]

    const posts: Post[] = [
      {id:'1', user:'admin', dogName:'dog1', dogBreed:'breed1', lostOn:new Date(2022, 6, 30), photos:['10']},
      {id:'2', user:'admin', dogName:'dog2', dogBreed:'breed2', lostOn:new Date(2022, 8, 9), photos:['11']},
      {id:'3', user:'wea123', dogName:'dog3', dogBreed:'breed3', lostOn:new Date(2022, 10, 10), photos:['12','13']}
    ]
    return {images, zones, users, posts};
  }
}
