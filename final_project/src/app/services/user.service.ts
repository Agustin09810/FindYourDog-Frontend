import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/User';

import { map, filter, ignoreElements } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersUrl = 'api/users';
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

getMessages(username1:string, username2:string){
  return this.getUserByUsername(username1).pipe(map(user => user?.messages.get(username2)));
}
}
