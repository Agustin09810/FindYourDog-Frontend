import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Chat } from './interfaces/Chat';
import { Image } from './interfaces/Image';
import { Message } from './interfaces/Message';
import { User } from './interfaces/User';
import { Zone } from './interfaces/Zone';
import { Post } from './interfaces/Post';
import { Department } from './interfaces/Department';



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
      {imgId:'9', name:'name9', id:'9', posts: []},
      {imgId:'10', name:'name11', id:'11', posts: ['1']},
      {imgId:'11', name:'name12', id:'12', posts: ['1', '4']},
      {imgId:'12', name:'name21', id:'21', posts: ['5']},
      {imgId:'13', name:'name22', id:'22', posts: ['4', '5']},
      {imgId:'14', name:'name31', id:'31', posts: ['1', '4', '5']},
      {imgId:'15', name:'name32', id:'32', posts: ['1', '4', '5']},
    ]

    const posts: Post[] = [
      {id:'1', user:'admin', dogName:'Pepe', dogBreed:'breed1', lostOn:new Date(2022, 6, 30), photos:['10', '11', '12']},
      {id:'2', user:'admin', dogName:'dog2', dogBreed:'breed2', lostOn:new Date(2022, 8, 9), photos:['11']},
      {id:'3', user:'wea123', dogName:'dog3', dogBreed:'breed3', lostOn:new Date(2022, 11, 10), photos:['12','13']},
      {id:'4', user:'wea123', dogName:'Capitán', dogBreed:'breed4', lostOn:new Date(2022, 9, 10), photos:['12','13']},
      {id:'5', user:'wea123', dogName:'Thor', dogBreed:'breed5', lostOn:new Date(2022, 9, 15), photos:['11','13']}
    ]
    
    const users: User[] = [//poner un id en messages y haecr una coleccion  array  messages con su id, asi 2 usuarios comparten el mismo id de array messages
      {id:'1', contactsIds:['2', '3', '5', '6', '7', '8', '9', '10'], chatsIds:['1', '2', '5', '6', '7', '8', '9', '220'], username:'admin', password:'admin', profileImg:'1', postsIds:['1', '2'], messages: []
      , departmentId:'1'},
      {id:'2', contactsIds:['1', '3'], chatsIds:['1', '3'], username:'user2', password:'user2', profileImg:'14', postsIds:['3', '4'], messages:[
        
      ], departmentId:'2'},
      {id:'3', contactsIds:['2', '1'], chatsIds:['2', '3'], username:'user3', password:'user3', profileImg:'15', postsIds:['5'], messages:[
        
      ], departmentId:'3'},
      {id:'5', contactsIds:['1'], chatsIds:['5'], username:'user5', password:'user5', profileImg:'15', postsIds:['5'], messages:[
        
      ], departmentId:'4'},
      {id:'6', contactsIds:['1'], chatsIds:['6'], username:'user6', password:'user6', profileImg:'15', postsIds:['5'], messages:[
        
      ], departmentId:'5'},
      {id:'7', contactsIds:['1'], chatsIds:['7'], username:'user7', password:'user7', profileImg:'15', postsIds:['5'], messages:[
        
      ], departmentId:'6'},
      {id:'8', contactsIds:['1'], chatsIds:['8'], username:'user8', password:'user8', profileImg:'15', postsIds:['5'], messages:[
        
      ], departmentId:'7'},
      {id:'9', contactsIds:['1'], chatsIds:['9'], username:'user9', password:'user9', profileImg:'15', postsIds:['5'], messages:[
        
      ], departmentId:'8'},
      {id:'10', contactsIds:['1'], chatsIds:['220'], username:'user10', password:'user10', profileImg:'15', postsIds:['5'], messages:[
        
      ], departmentId:'9'}


      
    ]

    const chats: Chat[] = [
      {id:'1', messagesIds:
      ['1', '2', '3', '4', '5']},

      {id:'2', messagesIds:['11','12']},

      {id:'5', messagesIds:[
        '21' , '22'
      ]},

      {id:'6', messagesIds:[
        '31', '32'
      ]},

      {id:'7', messagesIds:[
        '41', '42'
      ]},

      {id:'8', messagesIds:[
        '51', '52'
      ]},

      {id:'9', messagesIds:[
        '61', '62'
      ]},

      {id:'220', messagesIds:[
        '71', '72'
      ]}
    ]

    const messages: Message[] = [
      {id:'1', originUsername:'admin', targetUsername:'user2', text:'te bloquie de ista pero por otra cuenta veo tus historias'},
      {id:'2', originUsername:'admin', targetUsername:'user2', text:'hola weon'},
      {id:'3', originUsername:'user2', targetUsername:'admin', text:'mira vos'},
      {id:'4', originUsername:'admin', targetUsername:'user2', text:'ye ye ye brr'},
      {id:'5', originUsername:'admin', targetUsername:'user2', text:'ando manejando x las callses q me besaste'},

      {id:'11', originUsername:'admin', targetUsername:'user3', text:'la wea xd'},
      {id:'12', originUsername:'user3', targetUsername:'admin', text:'hola weon'},

      {id:'21', originUsername:'admin', targetUsername:'user5', text:'la wea xd'},
      {id:'22', originUsername:'user5', targetUsername:'admin', text:'hola weon5'},

      {id:'31', originUsername:'admin', targetUsername:'user6', text:'la wea xd'},
      {id:'32', originUsername:'user6', targetUsername:'admin', text:'hola weon6'},

      {id:'41', originUsername:'admin', targetUsername:'user7', text:'la wea xd'},
      {id:'42', originUsername:'user7', targetUsername:'admin', text:'hola weon7'},

      {id:'51', originUsername:'admin', targetUsername:'user8', text:'la wea xd'},
      {id:'52', originUsername:'user8', targetUsername:'admin', text:'hola weon8'},

      {id:'61', originUsername:'admin', targetUsername:'user9', text:'la wea xd'},
      {id:'62', originUsername:'user9', targetUsername:'admin', text:'hola weon9'},

      {id:'71', originUsername:'admin', targetUsername:'user10', text:'la wea xd'},
      {id:'72', originUsername:'user10', targetUsername:'admin', text:'hola weon10220'}
    ]

    const departments:Department[] = [
      {id:'1', name:'Montevideo', zonesId:['1', '2', '3', '4', '5', '6', '7', '8', '9']},
      {id:'2', name:'Canelones', zonesId:['11', '12']},
      {id:'3', name:'Maldonado', zonesId:['21', '22']},
      {id:'4', name:'San José', zonesId:['31', '32']},
      {id:'5', name:'Colonia', zonesId:['12', '11']},
      {id:'6', name:'Soriano', zonesId:['12', '11']},
      {id:'7', name:'Flores', zonesId:['12', '11']},
      {id:'8', name:'Florida', zonesId:['12', '11']},
      {id:'9', name:'Lavalleja', zonesId:['12', '11']},
      {id:'10', name:'Rocha', zonesId:['12', '11']},
      {id:'11', name:'Treinta y tres', zonesId:['12', '11']},
      {id:'12', name:'Durazno', zonesId:['12', '11']},
      {id:'13', name:'Río Negro', zonesId:['12', '11']},
      {id:'14', name:'Paysandú', zonesId:['12', '11']},
      {id:'15', name:'Tacuarembó', zonesId:['12', '11']},
      {id:'16', name:'Cerro Largo', zonesId:['12', '11']},
      {id:'17', name:'Rivera', zonesId:['12', '11']},
      {id:'18', name:'Salto', zonesId:['12', '11']},
      {id:'19', name:'Artigas', zonesId:['12', '11']},

    ]
    return {images, zones, users, chats, posts, messages, departments};
  }
}
