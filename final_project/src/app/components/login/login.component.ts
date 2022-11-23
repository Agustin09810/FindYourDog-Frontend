import { Component, Directive, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoginButtonComponent } from './login-button/login-button.component';
import { LoginInputComponent } from './login-input/login-input.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild(LoginInputComponent, {static : true}) childInput! : LoginInputComponent;
  @ViewChild(LoginButtonComponent, {static : true}) childButton! : LoginButtonComponent;
  constructor() { }

  ngOnInit(): void {
  }

  getData() {
    let pass = this.childInput.getPassword();
    let user = this.childInput.getUsername();
    this.childButton.loginCheck(user, pass);
  }

  
}
