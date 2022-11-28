import { Component, Directive, ElementRef, OnInit, ViewChild, } from '@angular/core';
import { LoginButtonComponent } from './login-button/login-button.component';
import { LoginInputComponent } from './login-input/login-input.component';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild(LoginInputComponent, {static : true}) childInput! : LoginInputComponent;
  @ViewChild(LoginButtonComponent, {static : true}) childButton! : LoginButtonComponent;
  constructor(
    private router: Router,
  ) { }

  errorUsername?: boolean
  errorPassword?: boolean

  ngOnInit(): void {
    if(localStorage.getItem("id_token") != null){
      this.router.navigate(['/home']);
    }
  }

  getData() {
    let pass = this.childInput.getPassword();
    let user = this.childInput.getUsername();
    this.childButton.loginCheck(user, pass);
  }
  
}
