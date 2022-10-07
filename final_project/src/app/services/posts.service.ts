import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Post } from '../interfaces/Post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private postsUrl = 'api/posts';
  constructor(private http:HttpClient) { }

  getPosts(){
    return this.http.get<Post[]>(this.postsUrl);
  }
}
