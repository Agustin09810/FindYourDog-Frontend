import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../interfaces/Message';

const messageUrl = 'api/messages';

@Injectable({
  providedIn: 'root'
})

export class MessageService {

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getMessageById(id:string){
    const url = messageUrl + `/${id}`;
    return this.http.get<Message>(url);
  }

  sendMessage(msg:Message){
    return this.http.post<Message>(messageUrl, msg, this.httpOptions);
  }
}
