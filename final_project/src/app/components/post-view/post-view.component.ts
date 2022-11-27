import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ImageByIdService } from 'src/app/services/image-by-id.service';
import { PostsService } from 'src/app/services/posts.service';

import { ActivatedRoute, Route, Router } from '@angular/router'; 
import { Post } from 'src/app/interfaces/Post';
import { Image } from 'src/app/interfaces/Image';
import { UserService } from 'src/app/services/user.service';
import { Chat } from 'src/app/interfaces/Chat';
import { ZonesService } from 'src/app/services/zones.service';
import { lastValueFrom } from 'rxjs';
import { User } from 'src/app/interfaces/User';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit {

  post?:Post;
  postImages:Image[] = [];
  currentUser?:User;

  @Input() 
  get inputPost():Post {return this.post!;}
  set inputPost(inputPost:Post){
    this.post = inputPost;
    this.getPostImages();
  }

  displayButton?:boolean = false;

 
  
  constructor(private postService:PostsService, 
    private imageService:ImageByIdService, 
    private route: ActivatedRoute, 
    private userService:UserService, 
    private zoneService:ZonesService,
    private router:Router) { }



  ngOnInit(): void {
    //Permite que cargue desde otros componentes pasando data a traves de inputs.
    if (this.inputPost) {
      this.post = this.inputPost;
      this.displayButton = false;
      this.getCurrentUser();
    }else{//default
      this.getPostById('post-view-Id');
      this.displayButton = true;
      this.getCurrentUser();
    }
  }

  getRotueId(routeId: string): string | undefined{
    const id = this.route.snapshot.paramMap.get(routeId);
    if(id){
      return id;
    }else{
      return undefined;
    }
  }

  getPostById(routeId: string): void {
    const id = this.getRotueId(routeId);
    if(id)
      {
        this.postService.getPostsById(id).subscribe(post => {
          this.post = post;
          console.log(post);
          this.post?.photos.forEach(imgId => {
            this.imageService.getImagesById(imgId).subscribe(x =>  {
              this.postImages?.push(x!);
            });
          })

        });
      }
  }

  cleanDate(date: Date): string {
    let dateInString: string = date.toString().split('T')[0];
    let dateToFormat = `${dateInString.substring(8,10)}/${dateInString.substring(5,7)}/${dateInString.substring(0,4)}`;
    return dateToFormat;
  }


  getPostImages() {
    this.postImages = [];
    this.post?.photos.forEach(imgId => {
      this.imageService.getImagesById(imgId).subscribe(x =>  {
        this.postImages?.push(x!);
      });
    })
  }


  getCurrentUser(){
    return this.userService.getUser().subscribe(user => this.currentUser = user);
  }
  //crer chat con el usuario que creo el post
  //agregar el chatId en ambos usuarios

  //get from route username
  contactUser(): void {


    if(this.currentUser){
      let chat:Chat = {id:'xd',  messagesIds:[]};

      this.userService.getUserByUsername(this.post?.user!).subscribe(user2 => {
        if(user2.contactsUsernames.find(x => x == this.currentUser?.username)){
          user2.chatsIds.forEach(chatUser2 => {
            this.currentUser!.chatsIds.forEach(chatUser1 => {
              if(chatUser2 == chatUser1){
                this.router.navigate(['/chats/' + user2.username + '/' + chatUser2]);
                return;
              }
            });
          });
          console.log('no podes neisdasdasdasd');
          return;
        }
        console.log('algogopaodj');
        this.userService.createChat(chat).subscribe(chatRecived => {
          console.log(chatRecived.id + ' elchat');
          user2.chatsIds.push(chatRecived.id);
          user2.contactsUsernames.push(this.currentUser!.username);

          this.currentUser!.chatsIds.push(chatRecived.id);
          this.currentUser!.contactsUsernames.push(user2.username);

          this.userService.updateUser(user2).subscribe( x => this.userService.updateUser(this.currentUser!).subscribe( y => this.router.navigate(['/chats/' + user2.username + '/' + chatRecived.id])));
        })

      });
    }   
  };
    
  

  deletePost(): void {
    if(this.post){
      let username = this.post.user;
      let postId = this.post.id;
      let zoneId = this.post.lostZone;
      let photosIds = this.post.photos;

      this.postService.deletePost(this.post!).subscribe( postDeleted => {


        photosIds.forEach( async photoId => {
          await lastValueFrom(this.imageService.deleteImage(photoId));
        })



        this.userService.getUserByUsername(username).subscribe(user => {
        let currentUser = user;
        let index = currentUser.postsIds.indexOf(postId);
        currentUser.postsIds.splice(index, 1);

        this.userService.updateUser(currentUser).subscribe( x => {

          this.zoneService.getZone(zoneId).subscribe(zone => {
            let currentZone = zone;
            let index = currentZone.postsIds.indexOf(postId);
            currentZone.postsIds.splice(index, 1);
            this.zoneService.updateZone(currentZone).subscribe( () =>  window.location.reload());
          });
        });
      });
    });
    }
  }

}
