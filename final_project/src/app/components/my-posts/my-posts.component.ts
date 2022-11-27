import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router'; 
import { Post } from 'src/app/interfaces/Post';
import { PostsService } from 'src/app/services/posts.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {

  posts:Post[] = [];
  post?:Post;
  postsViews:number = 0;
  display?: boolean;

  constructor(private route: ActivatedRoute, private userService:UserService, private postsService:PostsService) { }

  ngOnInit(): void {
    this.getMyPosts();
  }

  getRouteId(routeId: string): string | undefined{
    const id = this.route.snapshot.paramMap.get(routeId);
    if(id){
      return id;
    }else{
      return undefined;
    }
  }

  getMyPosts(){
    this.userService.getUser().subscribe(user => {
      let count:number = 0;
      user?.postsIds.forEach(postId => {
        this.postsService.getPostsById(postId).subscribe(post => {
          if(post.status==404){
            console.error('Error 404: POST NOT FOUND');
            return;
          }
          this.posts.push(post!); 
          if(count === 0){this.post = post};
          count++;
        });
      });
      if(user!.postsIds.length > 0){this.display = true;}else{this.display = false;}
    })
  }

  nextPost(){
    if(this.postsViews < this.posts.length-1){
      this.postsViews++;
      this.post = this.posts.at(this.postsViews);
    }else{
    }
    
  }

  previousPost(){
    if(this.postsViews > 0){
      this.postsViews--;
      this.post = this.posts.at(this.postsViews);
    }else{
    }
  }

}
