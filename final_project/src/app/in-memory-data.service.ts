import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Image } from './interfaces/Image';
import { User } from './interfaces/User';
import { Zone } from './interfaces/Zone';



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
      { imageId: '9', imageUrl: '../assets/images/img3.jpg' }
    ];
    const zones: Zone[] = [
      {imgId:'1', name:'name1', zoneId:'1'},
      {imgId:'2', name:'name2', zoneId:'2'},
      {imgId:'3', name:'name3', zoneId:'3'},
      {imgId:'4', name:'name4', zoneId:'4'},
      {imgId:'5', name:'name5', zoneId:'5'},
      {imgId:'6', name:'name6', zoneId:'6'},
      {imgId:'7', name:'name7', zoneId:'7'},
      {imgId:'8', name:'name8', zoneId:'8'},
      {imgId:'9', name:'name9', zoneId:'9'}
    ]

    const users: User[] = [
      {username:'admin', password:'admin', profileImg:'1', messages: new Map([
        ['user2', [{originUsername:'admin', targetUsername:'user2', text:'hola weon'}, {originUsername:'admin', targetUsername:'user2', text:'te bloquie de ista pero por otra cuenta veo tus historias'}, {originUsername:'admin', targetUsername:'user2', text:'ando manejando x las callses q me besaste'}]
        ], ['user3', []]
      ])},
      {username:'wea123', password:'wea123', profileImg:'1', messages: new Map([['user2', []], ['user1', []]])}
      
    ]
    return {images, zones, users};
  }
}
