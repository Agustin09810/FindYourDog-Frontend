import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { DepartmentService } from '../../services/department.service';
import { Department } from '../../interfaces/Department';

import {ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  departments?: Department[];
  @Input() errorUsername?: string;
  errorMail: boolean = false;
  errorPass?: string;
  errorDepartment: boolean = false;

  constructor(
    private departmentService: DepartmentService,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments(): void{
    this.departmentService.getDepartments().subscribe(departments => this.departments = departments);
  }

  register(user: string, mail: string, password: string, department: string): void{
    if(user == undefined || user == ""){
      this.errorUsername = 'empty';
    } else if(user.length < 4){
      this.errorUsername = 'short';
      console.log(user);
  } else if(!/^[A-Za-z0-9]*$/.test(user)){
    this.errorUsername = 'invalid';
  }
  if(mail == undefined || mail == ""){
    this.errorMail = true;
  }
  if(password == undefined || password == ""){
    this.errorPass = 'empty';
  } else if(password.length < 8){
    this.errorPass = 'short';
  }
  if(department == undefined || department == ""){
    this.errorDepartment = true;
  }
  if(this.errorUsername != undefined || this.errorMail == true || this.errorPass != undefined || this.errorDepartment == true){
    console.log('error en signup');
    console.log(this.errorUsername);
    this.errorUsername = undefined;
    this.cd.detectChanges();
    return;
  }
  console.log('todo bien');
}

}
