import { Injectable } from '@angular/core';
import * as moment from "moment";
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/User';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL: string ='http://localhost:3000/api/v1/login';

  constructor(private http: HttpClient) {
  }

  login(username:string, password: string): Observable<any> {
    return this.http.post<any>(this.URL, {username, password})
    .pipe(tap(res => this.setSession(res)), shareReplay());
  }
        
  private setSession(authResult: any) {
    const expiresAt = moment().add(authResult.expiresIn,'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }          

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }
}