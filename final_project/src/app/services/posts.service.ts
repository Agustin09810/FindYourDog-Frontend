import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Post } from '../interfaces/Post';

import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private postsUrl = 'api/posts';
  constructor(private http:HttpClient) { }

  getPosts(): Observable<Post[]>{
    return this.http.get<Post[]>(this.postsUrl);
  }

  getPostsById(id: string){
    return this.getPosts().pipe(map(posts => posts.find(post => post.id === id)));
  }
}
