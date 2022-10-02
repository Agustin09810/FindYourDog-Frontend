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
    return this.getUsers().pipe(map(users => users.find(user => ((user.username === username) && (user.password === password)))));
  }
  
}
