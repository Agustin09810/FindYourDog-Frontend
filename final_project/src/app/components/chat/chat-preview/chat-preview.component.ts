import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user.service';
import { UserPreviewComponent } from '../../user-preview/user-preview.component';

@Component({
  selector: 'app-chat-preview',
  templateUrl: './chat-preview.component.html',
  styleUrls: ['./chat-preview.component.css']
})
export class ChatPreviewComponent implements OnInit {

  username:string = 'admin';
  user?:User;
  contacts:User[] = [];
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.getUser(this.username);
  }


  getUser(username:string) {
    this.userService.getUserByUsername(username).subscribe(x => {
      this.user = x;
      console.log(x + 'xd user');
      this.userService.getContactsIds(this.user!.username).subscribe(x => {
        x!.forEach(element => {
          this.userService.getUserById(element).subscribe(y => {
            console.log(y?.id + 'y');
            this.contacts?.push(y!);
            console.log(this.contacts + 'contactos')
          })
        });
      });
    });
  }


  
  


}
