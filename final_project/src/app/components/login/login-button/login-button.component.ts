import { Component, OnInit, Output } from '@angular/core';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css']
})
export class LoginButtonComponent implements OnInit {

  user?:User;
  userChanged: boolean = false;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

  loginCheck(username:string, password:string) {
    let user = {
      id: '', contactsUsernames: [], chatsIds: [], username: username, password: password, profileImg: '', postsIds: [], messages: [], departmentId: ''
    }
    this.userService.login(user).subscribe(x => {
      this.user = x;
      console.log(this.user + 'user');
      this.changeUser();
      console.log(this.userChanged + 'changeuser');
  });
  }

  changeUser(){
    this.userChanged = true;
  }

}
