import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/User';

import { map, filter, ignoreElements, switchMap } from 'rxjs/operators';
import { combineLatest, forkJoin, Observable, pipe } from 'rxjs';
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

  login(user: User): Observable<User|undefined> {
    return this.http.post<User>(this.usersUrl, user, this.httpOptions);
  }

  getUserByUsername(username:string) {
    return this.http.get<User>(`${this.usersUrl}/${username}`);
 }


  sendMessage(chat:Chat) {
    return this.http.put<Chat>(this.chatsUrl+`/${chat.id}`, chat, this.httpOptions);
  }


  getContactsUsernames(username:string){
    return this.getUserByUsername(username).pipe(map(user => user?.contactsUsernames));
  }

  

  getChatById(chatId:string){
    return this.http.get<Chat>(`${this.chatsUrl}/${chatId}`);
  }

  updateDepartment(user:User){
    return this.http.put<User>(this.usersUrl, user, this.httpOptions);
  }

}
