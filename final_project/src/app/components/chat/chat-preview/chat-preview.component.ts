import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user.service';
import { UserPreviewComponent } from '../../user-preview/user-preview.component';

@Component({
  selector: 'app-chat-preview',
  templateUrl: './chat-preview.component.html',
  styleUrls: ['./chat-preview.component.css']
})
export class ChatPreviewComponent implements OnInit {

  
  user?:User;
  contacts:User[] = [];
  constructor(private userService:UserService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getUser();
  }


  getUser() {
    const username = this.route.snapshot.paramMap.get('username');
    if(username){
      this.userService.getUserByUsername(username).subscribe(x => {
        this.user = x;

        this.userService.getContactsUsernames(this.user!.username).subscribe(x => {
          x!.forEach(element => {
            this.userService.getUserByUsername(element).subscribe(y => {
              this.contacts?.push(y!);
              console.log(this.contacts + 'contactos')
            })
          });
        });
      });
    }
  }

    


  
  


}
