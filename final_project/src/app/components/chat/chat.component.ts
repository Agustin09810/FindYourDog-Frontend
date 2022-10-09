import { Component, Input, OnInit } from '@angular/core';
import { Chat } from 'src/app/interfaces/Chat';
import { Message } from 'src/app/interfaces/Message';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  originUsername:string = 'admin';
  targetUsername:string = 'user2';
  @Input() chatId!:string;
  @Input() user!:User;
  messages?: Message[] = [];

  isDisplaying:boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    //this.getUser(this.originUsername);
    console.log(this.chatId);
    this.getMessages(this.chatId);
    console.log(this.user + 'xd');
  }

  show(): void {
    this.isDisplaying = true;
  }

  hide(): void {
    this.isDisplaying = false;
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
    let msg: Message = { originUsername: this.originUsername, targetUsername: this.targetUsername, text: message};
    //this.messages?.push(msg);
    let user:User = this.user!;
    let messagesCopy:Message[] = [...this.messages!];
    messagesCopy.push(msg);

    let chat:Chat = {id:this.chatId, messages:messagesCopy}
    this.userService.sendMessage(chat).subscribe(() => console.log(this.user?.messages));
    this.getMessages(this.chatId);
    
  }


}
