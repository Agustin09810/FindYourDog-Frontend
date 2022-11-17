import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ImageByIdService } from 'src/app/services/image-by-id.service';
import { PostsService } from 'src/app/services/posts.service';

import { ActivatedRoute } from '@angular/router'; 
import { Post } from 'src/app/interfaces/Post';
import { Image } from 'src/app/interfaces/Image';
import { UserService } from 'src/app/services/user.service';
import { Chat } from 'src/app/interfaces/Chat';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit {

  post?:Post;
  postImages:Image[] = [];

  @Input() 
  get inputPost():Post {return this.post!;}
  set inputPost(inputPost:Post){
    this.post = inputPost;
    this.getPostImages();
  }

  displayButton?:boolean;

 
  
  constructor(private postService:PostsService, private imageService:ImageByIdService, private route: ActivatedRoute, private userService:UserService) { }



  ngOnInit(): void {
    //Permite que cargue desde otros componentes pasando data a traves de inputs.
    if (this.inputPost) {
      this.post = this.inputPost;
      this.displayButton = false;
    }else{//default
      this.getPostById('post-view-Id');
      this.displayButton = true;
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
          this.post?.photos.forEach(imgId => {
            this.imageService.getImagesById(imgId).subscribe(x =>  {
              this.postImages?.push(x!);
            });
          })

        });
      }
  }

  getPostImages() {
    this.postImages = [];
    this.post?.photos.forEach(imgId => {
      this.imageService.getImagesById(imgId).subscribe(x =>  {
        this.postImages?.push(x!);
      });
    })
  }

  //crer chat con el usuario que creo el post
  //agregar el chatId en ambos usuarios

  //get from route username
  contactUser(): void {
    const username = this.getRotueId('username');
    if(username){
      this.userService.getUserByUsername(username).subscribe(user => {
        let chat:Chat = {id:'xd',  messagesIds:[]};

        this.userService.createChat(chat).subscribe(chatRecived => {

          this.userService.getUserByUsername(this.post?.user!).subscribe(user2 => {
            console.log(chatRecived.id + ' elchat');
            user2.chatsIds.push(chatRecived.id);
            user2.contactsUsernames.push(user.username);

            user.chatsIds.push(chatRecived.id);
            user.contactsUsernames.push(user2.username);

            console.log(user)
            console.log(user2)

            this.userService.updateUser(user2).subscribe( x => this.userService.updateUser(user).subscribe());
          })
        });
       
        
      });
    }
  }

}
