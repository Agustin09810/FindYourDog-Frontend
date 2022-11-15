import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../interfaces/Message';


@Injectable({
  providedIn: 'root'
})

export class MessageService {
  
  private messagesUrl = 'http://localhost:3000/api/v1/messages';

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getMessageById(id:string){
    const url = this.messagesUrl + `/${id}`;
    return this.http.get<Message>(url);
  }

  sendMessage(msg:Message){
    return this.http.post<Message>(this.messagesUrl, msg, this.httpOptions);
  }
}
