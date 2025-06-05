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

  user?: User;
  contacts?: User[];
  isLoading: boolean = true;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.isLoading = true;
    this.userService.getUser().subscribe({
      next: (x) => {
        this.user = x;
        this.loadContacts();
      },
      error: (error) => {
        console.error('Error loading user:', error);
        this.isLoading = false;
      }
    });
  }

  loadContacts() {
    if (!this.user || !this.user.username) {
      this.isLoading = false;
      return;
    }

    this.userService.getContactsUsernames(this.user.username).subscribe({
      next: (contactUsernames) => {
        if (!contactUsernames || contactUsernames.length === 0) {
          this.contacts = [];
          this.isLoading = false;
          return;
        }

        this.contacts = [];
        let loadedCount = 0;
        
        contactUsernames.forEach(contactUsername => {
          this.userService.getUserByUsername(contactUsername).subscribe({
            next: (contactUser) => {
              if (contactUser.status === 404) {
                console.error('Error 404, USER NOT FOUND:', contactUsername);
              } else {
                this.contacts!.push(contactUser);
              }
              
              loadedCount++;
              if (loadedCount === contactUsernames.length) {
                this.isLoading = false;
              }
            },
            error: (error) => {
              console.error('Error loading contact:', contactUsername, error);
              loadedCount++;
              if (loadedCount === contactUsernames.length) {
                this.isLoading = false;
              }
            }
          });
        });
      },
      error: (error) => {
        console.error('Error loading contacts:', error);
        this.isLoading = false;
      }
    });
  }
}
