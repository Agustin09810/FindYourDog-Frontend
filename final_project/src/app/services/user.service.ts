import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/User';
import { Router } from '@angular/router';

import { map, catchError } from 'rxjs/operators';
import { Observable, of, tap } from 'rxjs';
import { Chat } from '../interfaces/Chat';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'http://localhost:3000/api/v1/users';
  private chatsUrl = 'http://localhost:3000/api/v1/chats';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient, 
    private router: Router ) { }

  getUserByUsername(username:string): Observable<User|any> {
    return this.http.get<User>(`${this.usersUrl}/${username}`).pipe(
      catchError(err => { return of(err)})
    );
 }

  getUser(): Observable<User|undefined> {
    return this.http.get<User>(this.usersUrl).pipe(tap(user => console.log(user)),
    catchError(err => { 
      if(err.status == 404){
        this.router.navigate(['/error404']);
      }
      return of(err)}));
  }


  updateChat(chat:Chat) {
    return this.http.put<Chat>(this.chatsUrl+`/${chat.id}`, chat, this.httpOptions).pipe(
      catchError(err => { return of(err)})
    );
  }

  createChat(chat:Chat){
    return this.http.post<Chat>(this.chatsUrl, chat, this.httpOptions);
  }


  getContactsUsernames(username:string): Observable<string[]>{
    return this.getUserByUsername(username).pipe(map(user => user?.contactsUsernames));
  }

  getChatById(chatId:string){
    return this.http.get<Chat>(`${this.chatsUrl}/${chatId}`).pipe(
      catchError(err => { return of(err)})
    );
  }

  updateUser(user:User){
    return this.http.put<User>(this.usersUrl + '/' + user.username, user, this.httpOptions).pipe(
      catchError(err => { return of(err)})
    );
  }

  createUser(user:User){
    return this.http.post<User>(`http://localhost:3000/api/v1/signup/${user.username}` , user, this.httpOptions).pipe
    (catchError(err => { return of(err) }));
  }

  confirmUser(code: string){
    return this.http.get<User>(`http://localhost:3000/api/v1/confirm/${code}`);
  }

}
