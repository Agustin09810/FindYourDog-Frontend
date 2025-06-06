import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { Message } from '../interfaces/Message';
import { BACKEND_PROD } from './constants';


@Injectable({
  providedIn: 'root'
})

export class MessageService {
  
  private messagesUrl = BACKEND_PROD + '/api/v1/messages';

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getMessageById(id:string){
    const url = this.messagesUrl + `/${id}`;
    return this.http.get<Message>(url).pipe(catchError( err => {
      return of(err);
    }));
  }

  sendMessage(msg:Message){
    return this.http.post<Message>(this.messagesUrl, msg, this.httpOptions);
  }
}
