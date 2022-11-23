import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { DepartmentService } from '../../services/department.service';
import { Department } from '../../interfaces/Department';

import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/User';

import {ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  departments?: Department[];
  @Input() errorUsername?: string;
  errorEmail?: string;
  errorPass?: string;
  errorDepartment: boolean = false;

  constructor(
    private departmentService: DepartmentService,
    private cd: ChangeDetectorRef,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    this.getDepartments();
  }

  getDepartments(): void{
    this.departmentService.getDepartmentsNoAuth().subscribe(departments => this.departments = departments);
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
    else{
      this.errorUsername = undefined;
    }

    if(mail == undefined || mail == ""){
      this.errorEmail = 'empty';
    } else{
      this.errorEmail = undefined;
    }

    if(password == undefined || password == ""){
      this.errorPass = 'empty';
    } else if(password.length < 8){
      this.errorPass = 'short';
    }
    else{
      this.errorPass = undefined;
    }

    if(department == undefined || department == "0" || department == ""){
      this.errorDepartment = true;
    }
    else{
      this.errorDepartment = false;
    }

    if(this.errorUsername != undefined || this.errorEmail != undefined || this.errorPass != undefined || this.errorDepartment == true){
      console.log('error en signup');
      this.cd.detectChanges();
    }
    else{
      console.log('todo bien');
      const userToCreate: User = { username: user, email: mail, password: password, departmentId: department, profileImg: '',
                        postsIds: [], chatsIds: [], contactsUsernames: [], messages: []};
      this.userService.createUser(userToCreate).subscribe(x => console.log(x));
    }
    //add username or email taken error

    
  }

}
