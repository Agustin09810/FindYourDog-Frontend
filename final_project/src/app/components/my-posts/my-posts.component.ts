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

  constructor(private route: ActivatedRoute, private userService:UserService, private postsService:PostsService) { }

  ngOnInit(): void {
    this.getMyPosts();
  }

  getRotueId(routeId: string): string | undefined{
    const id = this.route.snapshot.paramMap.get(routeId);
    if(id){
      return id;
    }else{
      return undefined;
    }
  }

  //get my posts / array de posts
  //cuando clickeo next agarro el n+1 elemento del array y lo seteo en una variable post, que se le pasa x input a post-view

  getMyPosts(){
    this.userService.getUser().subscribe(user => {
      let count:number = 0;
      user?.postsIds.forEach(postId => {
        this.postsService.getPostsById(postId).subscribe(post => {
          this.posts.push(post!); 
          console.log(this.posts); 
          if(count === 0){this.post = post};
          count++;
        });
      });
    })
  }

  nextPost(){
    if(this.postsViews < this.posts.length-1){
      this.postsViews++;
      this.post = this.posts.at(this.postsViews);
    }else{
      console.log('no se puede avanzar mas');
    }
    
  }

  previousPost(){
    if(this.postsViews > 0){
      this.postsViews--;
      this.post = this.posts.at(this.postsViews);
    }else{
      console.log('no se puede retroceder mas');
    }
  }

}
