import { Component, Input, OnInit } from '@angular/core';
import { Chat } from 'src/app/interfaces/Chat';
import { Message } from 'src/app/interfaces/Message';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user.service';

import { ActivatedRoute, TitleStrategy } from '@angular/router';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  originUsername?:string;
  targetUsername?:string;
  chatId?:string;
  user?:User;
  messages?: Message[] = [];
  messagesBool?:boolean;


  constructor(private userService: UserService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.loadChat();
  }


  loadChat(){
    const userId = this.route.snapshot.paramMap.get('userId');
    const targetUserId = this.route.snapshot.paramMap.get('targetUserId');
    const chatId = this.route.snapshot.paramMap.get('chatId');
  
    console.log(userId + ' ' + targetUserId + ' ' + chatId);
    if(userId && targetUserId && chatId){
      this.chatId = chatId;
      this.userService.getUserById(userId).subscribe(originUser => {
        this.user = originUser;
        this.originUsername = originUser?.username;
        console.log('originUser = ' + this.originUsername);
        this.userService.getUserById(targetUserId).subscribe(targetUser => {
          this.targetUsername = targetUser?.username;
          console.log('targetUsername = ' + this.targetUsername);
          this.userService.getMessagesByChatId(chatId).subscribe(chat => {this.messages = chat?.messages; this.messagesBool = true});
        })
      })
    }
  }


  

  //dado un usuario, llamar al servicio que traiga los chats de ese usuario
  /*
  getUser(username:string) {
    this.userService.getUserByUsername(username).subscribe(x => {
      this.user = x;
      console.log(x);
      this.user!.messages.forEach((msg:Message) => ((msg.targetUsername === this.targetUsername)||(msg.targetUsername === this.originUsername)) ? this.messages?.push(msg) : console.log('este no lo meto'));
    });
  }
  */

  getMessages(chatId:string){
    this.userService.getMessagesByChatId(chatId).subscribe(x => this.messages = x?.messages);
  }

  sendMessage(message:string) {

    if(this.originUsername && this.targetUsername && this.chatId && this.messagesBool == true){
      let msg: Message = { originUsername: this.originUsername, targetUsername: this.targetUsername, text: message};
      let user:User = this.user!;
      let messagesCopy:Message[] = [...this.messages!];
      messagesCopy.push(msg);
  
      let chat:Chat = {id:this.chatId, messages:messagesCopy}
      this.userService.sendMessage(chat).subscribe(() => console.log(this.user?.messages));
      this.getMessages(this.chatId);  
    }
    
  }


}
