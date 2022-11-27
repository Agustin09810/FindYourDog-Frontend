import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Image } from 'src/app/interfaces/Image';
import { User } from 'src/app/interfaces/User';
import { ImageByIdService } from 'src/app/services/image-by-id.service';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';
import { ChatComponent } from '../chat/chat.component';


@Component({
  selector: 'app-user-preview',
  templateUrl: './user-preview.component.html',
  styleUrls: ['./user-preview.component.css']
})
export class UserPreviewComponent implements OnInit {


  constructor(private userService:UserService, private imageService:ImageByIdService, private messageService:MessageService) { }

  @Input() user!:User;
  @Input() originUser!:User;
  chatId!:string;
  lastMessage?:string;
  profileImgUrl?:Image;

  ngOnInit(): void {
    this.getChatId(this.originUser!, this.user!);
    this.getChat(this.chatId);
    this.imageService.getImagesById(this.user.profileImg).subscribe(x => {
      if(x.status==404){
        console.error("Error 404: IMAGE NOT FOUND");
        return;
      }
      this.profileImgUrl = x});


  }


  getChatId(user1:User, user2:User) {
    user1.chatsIds.forEach(element => {
      if(user2.chatsIds.includes(element)){
        this.chatId = element;
        return;
      }
    });

  }

  //Se obtiene el chat y posteriormente su último mensaje.
  getChat(chatId:string){
    this.userService.getChatById(chatId).subscribe(chat => {
      if(chat.status==404){
        console.error('Error 404, CHAT NOT FOUND');
        return;
      }
      this.messageService.getMessageById(chat?.messagesIds.at(-1)!).subscribe(
      message => this.lastMessage = message.text.substring(0, 20) + '...'
    )});
  }

  


  

  //limitar el tamaño del username mostrado y ddel last msg mostrado.

}
