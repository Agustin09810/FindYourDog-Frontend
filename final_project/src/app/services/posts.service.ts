import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Post } from '../interfaces/Post';

import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private postsUrl = 'http://localhost:3000/api/v1/posts';

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getPosts(): Observable<Post[]>{
    return this.http.get<Post[]>(this.postsUrl);
  }

  getPostsById(id: string){
    return this.http.get<Post>(`${this.postsUrl}/${id}`);
  }

  getPostsByZone(zoneId: string, pageNumber: number): Observable<any> {
    return this.http.get<Post[]>(`${this.postsUrl}?zoneId=${zoneId}&page=${pageNumber}`);
  }

  addPost(post: Post): Observable<Post>{
    return this.http.post<Post>(this.postsUrl, post, this.httpOptions).pipe(
      tap((newPost: Post) => console.log(`added post with id=${newPost.id}`)),
    catchError(this.handleError<Post>('addPost'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  updatePost(post: Post): Observable<Post>{
    return this.http.put<Post>(`${this.postsUrl}/${post.id}`, post, this.httpOptions).pipe(
      tap((newPost: Post) => console.log(`updated post with id=${newPost.id}`)),
    catchError(this.handleError<Post>('updatePost'))
    );
  }

  deletePost(post: Post): Observable<Post>{
      return this.http.delete<Post>(`${this.postsUrl}/${post.id}`, this.httpOptions).pipe(
      tap((newPost: Post) => console.log(`deleted post with id=${newPost.id}`)),
      catchError(this.handleError<Post>('deletePost'))
      );
  } 
}
