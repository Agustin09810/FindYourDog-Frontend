import { BinaryOperatorExpr } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login-input',
  templateUrl: './login-input.component.html',
  styleUrls: ['./login-input.component.css']
})
export class LoginInputComponent implements OnInit {

  password:string = '';
  username:string = '';
  @ViewChild('usernameInput') user!: ElementRef;
  @ViewChild('passwordInput') pass!: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }

  getUsername() {
    this.username = this.user.nativeElement.value;

  }

  getPassword() {
    this.password = this.pass.nativeElement.value;

  }



}
