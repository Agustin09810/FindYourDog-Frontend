import { Component, Input, OnInit } from '@angular/core';
import { Chat } from 'src/app/interfaces/Chat';
import { Message } from 'src/app/interfaces/Message';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user.service';

import { ActivatedRoute, TitleStrategy } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  originUsername?:string;
  targetUsername?:string;
  chatId?:string;
  chat?:Chat;
  user?:User;
  messages?: Message[] = [];
  messagesBool?:boolean;


  constructor(private userService: UserService, private route:ActivatedRoute, private messageService:MessageService) { }

  ngOnInit(): void {
    this.loadChat();
  }


  loadChat(){
    const targetUsername = this.route.snapshot.paramMap.get('targetUsername');
    const chatId = this.route.snapshot.paramMap.get('chatId');
  
    if(targetUsername && chatId){
      this.chatId = chatId;

      this.userService.getUser().subscribe(originUser => {
        this.originUsername = originUser?.username;
        this.userService.getUserByUsername(targetUsername).subscribe(targetUser => {
          this.targetUsername = targetUser?.username;
          this.userService.getChatById(chatId).subscribe(chat => {
            this.chat = chat;
            chat?.messagesIds.forEach(id => this.messageService.getMessageById(id).subscribe(msg => this.messages?.push(msg))); 
            this.messagesBool = true;
          });
        })
      })
    }
  }


  


  /*getMessages(chatId:string){
    this.userService.getChatById(chatId).subscribe(chat => {
      //this.chat = chat;
      chat?.messagesIds.forEach(id => this.messageService.getMessageById(id).subscribe(msg => {
        let msgFound = this.chat?.messagesIds!.find(messageId => msg.id === messageId);
        if(msgFound == undefined){
          this.messages?.push(msg); 
        }
      })); 
    })
  }*/

  sendMessage(message:string) {
    function generateRandomInt(max:number) {
      return Math.floor(Math.random() * max) + 1;
    }

    let idMsg:number = generateRandomInt(100000000000);

    if(this.originUsername && this.targetUsername && this.chatId && this.messagesBool == true){
      let msg: Message = { id: `${idMsg}`, originUsername: this.originUsername, targetUsername: this.targetUsername, text: message};
      let user:User = this.user!;

      let messagesIdsCopy:string[] = [...this.chat?.messagesIds!];
      messagesIdsCopy.push(msg.id);
  
      let chat:Chat = {id:this.chatId, messagesIds:messagesIdsCopy}
      this.messageService.sendMessage(msg).subscribe(() => {
        this.messages?.push(msg);
        this.userService.updateChat(chat).subscribe(() => {
          this.chat?.messagesIds.push(msg.id);
        });
      });
      
    
    }
    
  }


}
