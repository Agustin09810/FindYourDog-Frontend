import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Post } from '../interfaces/Post';

import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { BACKEND_PROD } from './constants';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private postsUrl = BACKEND_PROD + '/api/v1/posts';

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getPostsById(id: string){
    return this.http.get<Post>(`${this.postsUrl}/${id}`).pipe(
      catchError( err => { return of(err)})
    );
  }

  getPostsByZone(zoneId: string, pageNumber: number): Observable<any> {
    return this.http.get<Post[]>(`${this.postsUrl}?zoneId=${zoneId}&page=${pageNumber}`).pipe(
      catchError( err => { return of(err)})
    );
  }

  addPost(post: Post): Observable<Post>{
    return this.http.post<Post>(this.postsUrl, post, this.httpOptions);
  }

  updatePost(post: Post): Observable<Post|any>{
    return this.http.put<Post>(`${this.postsUrl}/${post.id}`, post, this.httpOptions).pipe(
      catchError( err => { return of(err)})
    );
  }

  deletePost(post: Post): Observable<Post|any>{
      return this.http.delete<Post>(`${this.postsUrl}/${post.id}`, this.httpOptions).pipe(
      catchError( err => { return of(err)})
      );
  } 
}
