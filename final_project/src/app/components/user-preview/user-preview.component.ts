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

  constructor(private userService: UserService, private imageService: ImageByIdService, private messageService: MessageService) { }

  @Input() user!: User;
  @Input() originUser!: User;
  chatId!: string;
  lastMessage?: string;
  profileImgUrl?: Image;
  imageError: boolean = false;

  ngOnInit(): void {
    this.getChatId(this.originUser!, this.user!);
    this.getChat(this.chatId);
    this.loadProfileImage();
  }

  loadProfileImage(): void {
    if (!this.user.profileImg) {
      this.imageError = true;
      return;
    }

    this.imageService.getImagesById(this.user.profileImg).subscribe({
      next: (image) => {
        if (image.status === 404) {
          console.error("Error 404: IMAGE NOT FOUND");
          this.imageError = true;
          return;
        }
        this.profileImgUrl = image;
        this.imageError = false;
      },
      error: (error) => {
        console.error('Error loading profile image:', error);
        this.imageError = true;
      }
    });
  }

  onImageError(): void {
    this.imageError = true;
  }

  getChatId(user1: User, user2: User) {
    user1.chatsIds.forEach(element => {
      if (user2.chatsIds.includes(element)) {
        this.chatId = element;
        return;
      }
    });
  }

  // Se obtiene el chat y posteriormente su último mensaje.
  getChat(chatId: string) {
    this.userService.getChatById(chatId).subscribe(chat => {
      if (chat.status == 404) {
        console.error('Error 404, CHAT NOT FOUND');
        return;
      }
      if (chat?.messagesIds && chat.messagesIds.length > 0) {
        this.messageService.getMessageById(chat?.messagesIds.at(-1)!).subscribe(
          message => {
            // Check if it's a photo message
            if (message.text.startsWith('[PHOTO:')) {
              this.lastMessage = '📷 Foto';
            } else {
              this.lastMessage = message.text.substring(0, 20) + '...';
            }
          }
        );
      }
    });
  }
}
