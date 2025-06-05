import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router'; 
import { Post } from 'src/app/interfaces/Post';
import { Image } from 'src/app/interfaces/Image';
import { PostsService } from 'src/app/services/posts.service';
import { UserService } from 'src/app/services/user.service';
import { ImageByIdService } from 'src/app/services/image-by-id.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {

  posts:Post[] = [];
  post?:Post;
  postsViews:number = 0;
  postImages: Image[] = []; // Store loaded images for current post
  isLoadingImages: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private userService:UserService, 
    private postsService:PostsService,
    private imageService: ImageByIdService
  ) { }

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
          if(count === 0){
            this.post = post;
            this.loadPostImages(post); // Load images for first post
          }
          count++;
        });
      });
    })
  }

  nextPost(){
    if(this.postsViews < this.posts.length-1){
      this.postsViews++;
      this.post = this.posts.at(this.postsViews);
      if(this.post) {
        this.loadPostImages(this.post);
      }
    }
  }

  previousPost(){
    if(this.postsViews > 0){
      this.postsViews--;
      this.post = this.posts.at(this.postsViews);
      if(this.post) {
        this.loadPostImages(this.post);
      }
    }
  }

  goToPost(index: number){
    if(index >= 0 && index < this.posts.length){
      this.postsViews = index;
      this.post = this.posts.at(this.postsViews);
      if(this.post) {
        this.loadPostImages(this.post);
      }
    }
  }

  // Load actual Image objects with URLs for the carousel
  loadPostImages(post: Post): void {
    this.isLoadingImages = true;
    this.postImages = [];
    
    if(!post.photos || post.photos.length === 0) {
      this.isLoadingImages = false;
      return;
    }

    let loadedCount = 0;
    post.photos.forEach(photoId => {
      this.imageService.getImagesById(photoId).subscribe(
        image => {
          if(image.status === 404) {
            console.error('Error 404: IMAGE NOT FOUND for ID:', photoId);
          } else {
            this.postImages.push(image);
          }
          loadedCount++;
          if(loadedCount === post.photos.length) {
            this.isLoadingImages = false;
          }
        },
        error => {
          console.error('Error loading image:', error);
          loadedCount++;
          if(loadedCount === post.photos.length) {
            this.isLoadingImages = false;
          }
        }
      );
    });
  }

  getPostImages(post: Post): Image[] {
    // Return the loaded Image objects with URLs
    return this.postImages;
  }

  getCleanDate(dateInput: Date | string): string {
    // Clean up the date format
    try {
      const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
      return date.toLocaleDateString('es-ES');
    } catch {
      return dateInput.toString();
    }
  }

  deletePost(postId: string): void {
    if(confirm('¿Estás seguro de que deseas eliminar esta publicación?')) {
      const postToDelete = this.posts.find(p => p.id === postId);
      if (postToDelete) {
        this.postsService.deletePost(postToDelete).subscribe({
          next: () => {
            // Remove from posts array
            this.posts = this.posts.filter(p => p.id !== postId);
            
            // Adjust current view if needed
            if(this.postsViews >= this.posts.length && this.posts.length > 0) {
              this.postsViews = this.posts.length - 1;
            }
            
            // Set current post and load its images
            if(this.posts.length > 0) {
              this.post = this.posts[this.postsViews];
              this.loadPostImages(this.post);
            } else {
              this.post = undefined;
              this.postImages = [];
            }
          },
          error: (error) => {
            console.error('Error deleting post:', error);
            alert('Error al eliminar la publicación');
          }
        });
      }
    }
  }
}
