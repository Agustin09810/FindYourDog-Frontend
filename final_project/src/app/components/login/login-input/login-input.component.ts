import { Component, ElementRef, OnInit, ViewChild, Input, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-login-input',
  templateUrl: './login-input.component.html',
  styleUrls: ['./login-input.component.css']
})
export class LoginInputComponent implements OnInit {


  @ViewChild('usernameInput') user!: ElementRef;
  @ViewChild('passwordInput') pass!: ElementRef;

  constructor(
  ) { }

  ngOnInit(): void {
  }

  getUsername(): string {
    return this.user.nativeElement.value;
  }

  getPassword(): string {
    return this.pass.nativeElement.value;

  }



}
