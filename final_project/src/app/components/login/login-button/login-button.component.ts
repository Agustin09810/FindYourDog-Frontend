import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css']
})
export class LoginButtonComponent implements OnInit {

  user?:User;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

  login(username:string, password:string): boolean {
    this.userService.login(username, password).subscribe(x => this.user = x);
    if(this.user == undefined){
      return false;
    }else{
      return true;
    }
  }
}
