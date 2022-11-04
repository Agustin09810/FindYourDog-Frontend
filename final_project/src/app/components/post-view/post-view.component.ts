import { Component, OnInit } from '@angular/core';
import { ImageByIdService } from 'src/app/services/image-by-id.service';
import { PostsService } from 'src/app/services/posts.service';

import { ActivatedRoute } from '@angular/router'; 
import { Post } from 'src/app/interfaces/Post';
import { Image } from 'src/app/interfaces/Image';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit {

  post?:Post;
  postImages:Image[] = [];
  constructor(private postService:PostsService, private imageService:ImageByIdService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPostById();
  }

  getPostById(): void {
    let id: any = this.route.snapshot.paramMap.get('post-view-Id');
    if(id)
    {
      id = parseInt(id);
      this.postService.getPostsById(id).subscribe(post => {
        this.post = post;
        this.post?.photos.forEach(imgId => {
          this.imageService.getImagesById(imgId).subscribe(x =>  {
            this.postImages?.push(x!);
            console.log(this.postImages.length);
          });
        })
      });
    }
  }

}
