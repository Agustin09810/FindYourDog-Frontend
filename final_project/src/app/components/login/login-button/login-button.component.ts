import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css']
})
export class LoginButtonComponent implements OnInit {

  user?:User;
  errorDisplay?: string
  errorUsername: boolean = false;
  errorPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private router:Router) { }

  ngOnInit(): void {
  }

  loginCheck(username:string, password:string) {
    if(username == "" || username==undefined){
      this.errorUsername = true;
    }else{
      this.errorUsername = false;
    }

    if(password == "" || password==undefined){
      this.errorPassword = true; 
    }
    else{
      this.errorPassword = false;
    }

    if(this.errorUsername && this.errorPassword){
      this.errorDisplay = "emptyBoth";
    }
    else if(this.errorUsername && !this.errorPassword){
      this.errorDisplay = "emptyUsername";
    }
    else if(this.errorPassword && !this.errorUsername){
      this.errorDisplay = "emptyPassword";
    }

    if(!this.errorUsername && !this.errorPassword){
      this.errorDisplay = undefined;
      this.authService.login(username, password).subscribe( x => {
        if(x.status == 404){
          this.errorDisplay = "invalid";
        }
        else if(x.status == 401){
          this.errorDisplay = "nonAuthorized";
        }
        else {
          this.router.navigate(['/home']);
        }
      });
    } 
  }
}
