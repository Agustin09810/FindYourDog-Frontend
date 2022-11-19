import { Component, OnInit, Output } from '@angular/core';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css']
})
export class LoginButtonComponent implements OnInit {

  user?:User;


  constructor(private userService:UserService,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  loginCheck(username:string, password:string) {
    this.authService.login(username, password).subscribe();
  }


}
