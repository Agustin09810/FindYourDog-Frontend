import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/User';

import { map, filter, ignoreElements, switchMap } from 'rxjs/operators';
import { combineLatest, forkJoin, Observable, pipe } from 'rxjs';
import { Message } from '../interfaces/Message';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersUrl = 'api/users';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http:HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  login(username:string, password:string): Observable<User|undefined> {
    console.log(username + ' ' + password + 'entre login service');
    return this.getUsers().pipe(map(users => users.find(user => 
                                          ((user.username === username) && (user.password === password)))), map(user => {
                                            if(user === undefined) {
                                              console.log('user undefined');
                                              return undefined;
                                            } else{
                                              console.log("user found");
                                              return user;
                                            }
                                          }));
  }

  getUserByUsername(username:string) {
    return this.getUsers().pipe(map(users => users.find(user => user.username === username)), map(user => {
                                                                                      if(user === undefined) {
                                                                                        console.log('user undefined');
                                                                                        return undefined;
                                                                                      } else{
                                                                                        console.log("user found");
                                                                                        return user;
                                                                                      }
                                                                                      }));
 }

 getUserById(id:string){
  return this.getUsers().pipe(map(users => users.find(user => user.id === id)));
 }

  getMessages(username1:string, username2:string){
    return this.getUserByUsername(username1).pipe(map(user => user?.messages));
  }

  sendMessage(user:User) {
    return this.http.put<User>(this.usersUrl, user, this.httpOptions)
  }

  getContactsIds(username:string){
    return this.getUserByUsername(username).pipe(map(user => user?.contactsIds));
  }

  getContacts(username:string){


    return this.getContactsIds(username).pipe(map(ids => ids?.map(id => this.getUserById(id))));

  }

}
