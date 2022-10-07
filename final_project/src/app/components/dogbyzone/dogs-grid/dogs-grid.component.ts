import { Component, OnInit } from '@angular/core';

import { Post } from 'src/app/interfaces/Post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-dogs-grid',
  templateUrl: './dogs-grid.component.html',
  styleUrls: ['./dogs-grid.component.css']
})
export class DogsGridComponent implements OnInit {

  posts: Post[] = []
  constructor(
    private postsService: PostsService
  ) { }

  ngOnInit(): void {
    this.postsService.getPosts().subscribe(postsReceived => this.posts = postsReceived);
  }
  
  

}
