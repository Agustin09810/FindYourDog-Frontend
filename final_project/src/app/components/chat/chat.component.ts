import { Component, OnInit } from '@angular/core';
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
  user?:User;
  messages?: Message[] = [];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUser(this.originUsername);
    console.log(this.user + 'xd');
  }

  //dado un usuario, llamar al servicio que traiga los chats de ese usuario
  getUser(username:string) {
    this.userService.getUserByUsername(username).subscribe(x => {
      this.user = x;
      console.log(x);
      this.user!.messages.forEach((msg:Message) => ((msg.targetUsername === this.targetUsername)||(msg.targetUsername === this.originUsername)) ? this.messages?.push(msg) : console.log('este no lo meto'));
    });
  }


}
