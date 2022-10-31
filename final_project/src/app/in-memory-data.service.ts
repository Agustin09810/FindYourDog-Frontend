import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Chat } from './interfaces/Chat';
import { Image } from './interfaces/Image';
import { Message } from './interfaces/Message';
import { User } from './interfaces/User';
import { Zone } from './interfaces/Zone';
import { Post } from './interfaces/Post';
import { Breed } from './interfaces/Breed';

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
      { imageId: '13', imageUrl: '../assets/images/dogs/dog3_1.jpg' },
      { imageId: '14', imageUrl: '../assets/images/users/arjona.jpg' },
      { imageId: '15', imageUrl: '../assets/images/users/ibai.jpeg' }

    ];
    const zones: Zone[] = [
      {imgId:'1', name:'name1', id:'1', posts: ['1', '4', '5']},
      {imgId:'2', name:'name2', id:'2', posts: ['2']},
      {imgId:'3', name:'name3', id:'3', posts: ['3']},
      {imgId:'4', name:'name4', id:'4', posts: []},
      {imgId:'5', name:'name5', id:'5', posts: []},
      {imgId:'6', name:'name6', id:'6', posts: []},
      {imgId:'7', name:'name7', id:'7', posts: []},
      {imgId:'8', name:'name8', id:'8', posts: []},
      {imgId:'9', name:'name9', id:'9', posts: []}
    ]

    const posts: Post[] = [
      {id:'1', user:'admin', dogName:'Pepe', dogBreed:'breed1', lostOn:new Date(2022, 6, 30), photos:['10', '11', '12']},
      {id:'2', user:'admin', dogName:'dog2', dogBreed:'breed2', lostOn:new Date(2022, 8, 9), photos:['11']},
      {id:'3', user:'wea123', dogName:'dog3', dogBreed:'breed3', lostOn:new Date(2022, 11, 10), photos:['12','13']},
      {id:'4', user:'wea123', dogName:'Capitán', dogBreed:'breed4', lostOn:new Date(2022, 9, 10), photos:['12','13']},
      {id:'5', user:'wea123', dogName:'Thor', dogBreed:'breed5', lostOn:new Date(2022, 9, 15), photos:['11','13']}
    ]
    
    const users: User[] = [//poner un id en messages y haecr una coleccion  array  messages con su id, asi 2 usuarios comparten el mismo id de array messages
      {id:'1', contactsIds:['2', '3'], chatsIds:['1', '2'], username:'admin', password:'admin', profileImg:'1', messages: [{originUsername:'admin', targetUsername:'user2', text:'hola weon'},
                   {originUsername:'admin', targetUsername:'user2', text:'te bloquie de ista pero por otra cuenta veo tus historias'},
                   {originUsername:'user2', targetUsername:'admin', text:'mira vos'},
                   {originUsername:'admin', targetUsername:'user2', text:'ye ye ye brr'},
                   {originUsername:'admin', targetUsername:'user2', text:'ando manejando x las callses q me besaste'}]
      },
      {id:'2', contactsIds:['1', '3'], chatsIds:['1', '3'], username:'user2', password:'user2', profileImg:'14', messages:[
        {originUsername:'user2', targetUsername:'user3', text:'la wea xd'},
        {originUsername:'admin', targetUsername:'user2', text:'hola weon'}
      ]},
      {id:'3', contactsIds:['2', '1'], chatsIds:['2', '3'], username:'user3', password:'user3', profileImg:'15', messages:[
        {originUsername:'user3', targetUsername:'user2', text:'la wea xd'},
        {originUsername:'user3', targetUsername:'user2', text:'hola weon'}
      ]}

      
    ]

    const chats: Chat[] = [
      {id:'1', messages:[{originUsername:'admin', targetUsername:'user2', text:'hola weon'},
      {originUsername:'admin', targetUsername:'user2', text:'te bloquie de ista pero por otra cuenta veo tus historias'},
      {originUsername:'user2', targetUsername:'admin', text:'mira vos'},
      {originUsername:'admin', targetUsername:'user2', text:'ye ye ye brr'},
      {originUsername:'admin', targetUsername:'user2', text:'ando manejando x las callses q me besaste'}]},
      {id:'2', messages:[
        {originUsername:'admin', targetUsername:'user3', text:'la wea xd'},
        {originUsername:'user3', targetUsername:'admin', text:'hola weon'}
      ]}
    ]

    const breeds: Breed[] = [
      {id:'1', name:'Australian Cattle Dog'},
      {id:'2', name:'Australian Shepherd'},
      {id:'3', name:'Australian Terrier'},
      {id:'4', name:'Basenji'},
      {id:'5', name:'Basset Hound'},
      {id:'6', name:'Beagle'},
      {id:'7', name:'Bearded Collie'},
      {id:'8', name:'Bedlington Terrier'},
      {id:'9', name:'Bloodhound'},
      {id:'10', name:'Border Collie'},
      {id:'11', name:'Border Terrier'},
      {id:'12', name:'Bull Terrier'},
      {id:'13', name:'Bulldog'},
      {id:'14', name:'Chesapeake Bay Retriever'},
      {id:'15', name:'Chihuahua'},
      {id:'16', name:'Chinese Crested'},
      {id:'17', name:'Chow Chow'},
      {id:'18', name:'Collie'},
      {id:'19', name:'Dalmatian'},
      {id:'20', name:'Doberman'},
      {id:'21', name:'English Cocker Spaniel'},
      {id:'22', name:'English Setter'},
      {id:'23', name:'Eskimo Dog'},
      {id:'24', name:'Fox Terrier'},
      {id:'25', name:'Foxhound'},
      {id:'26', name:'French Bulldog'},
      {id:'27', name:'German Shepherd'},
      {id:'28', name:'Golden Retriever'},
      {id:'29', name:'Irish Setter'},
      {id:'30', name:'Irish Wolfhound'},
      {id:'31', name:'Japanese Spaniel'},
      {id:'32', name:'Labrador Retriever'},
      {id:'33', name:'Maltese'},
      {id:'34', name:'Norwegian Elkhound'},
      {id:'35', name:'Otterhound'},
      {id:'36', name:'Pekingese'},
      {id:'37', name:'Poodle'},
      {id:'38', name:'Pug'},
      {id:'39', name:'Rhodesian Ridgeback'},
      {id:'40', name:'Rottweiler'},
      {id:'41', name:'Saint Bernard'},
      {id:'42', name:'Scottish Deerhound'},
      {id:'43', name:'Sussex Spaniel'},
      {id:'44', name:'Tibetan Terrier'},
      {id:'45', name:'Weimaraner'},
      {id:'46', name:'Welsh Terrier'},
      {id:'47', name:'West Highland White Terrier '},
      {id:'48', name:'Whippet'},
      {id:'49', name:'Yorkshire Terrier'},
      {id:'50', name:'Zerdava'},
    ]

    return {images, zones, users, chats, posts, breeds};
  }
}
