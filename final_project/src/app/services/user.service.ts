import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/User';

import { map, filter, ignoreElements, switchMap, catchError } from 'rxjs/operators';
import { combineLatest, forkJoin, Observable, pipe, of, tap } from 'rxjs';
import { Message } from '../interfaces/Message';
import { Chat } from '../interfaces/Chat';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'http://localhost:3000/api/v1/users';
  private chatsUrl = 'http://localhost:3000/api/v1/chats';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http:HttpClient, private messageService: MessageService) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  login(username: string, password: string): Observable<any|undefined> {
    return this.http.post<any>(this.usersUrl, { username, password }, this.httpOptions);
  }

  getUserByUsername(username:string) {
    return this.http.get<User>(`${this.usersUrl}/${username}`);
 }

  getUser(): Observable<User|undefined> {
    return this.http.get<User>(this.usersUrl);
  }


  updateChat(chat:Chat) {
    return this.http.put<Chat>(this.chatsUrl+`/${chat.id}`, chat, this.httpOptions);
  }

  createChat(chat:Chat){
    return this.http.post<Chat>(this.chatsUrl, chat, this.httpOptions);
  }


  getContactsUsernames(username:string){
    return this.getUserByUsername(username).pipe(map(user => user?.contactsUsernames));
  }

  getChatById(chatId:string){
    return this.http.get<Chat>(`${this.chatsUrl}/${chatId}`);
  }

  updateUser(user:User){
    return this.http.put<User>(this.usersUrl + '/' + user.username, user, this.httpOptions);
  }

  createUser(user:User){
    return this.http.post<User>(`http://localhost:3000/api/v1/signup/${user.username}` , user, this.httpOptions);
  }

  confirmUser(code: string){
    return this.http.get<User>(`http://localhost:3000/api/v1/confirm/${code}`);
  }

}
