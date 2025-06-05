import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { DepartmentService } from '../../services/department.service';
import { Department } from '../../interfaces/Department';

import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/User';

import {ChangeDetectorRef} from '@angular/core';
import { UserLogin } from 'src/app/interfaces/UserLogin';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  departments?: Department[];
  isLoading: boolean = false;
  isLoadingDepartments: boolean = true;
  
  // Form validation states
  validUsername: string = '';
  validEmail: string = '';
  validPass: string = '';
  validDepartment: string = '';
  
  // Error states
  errorUsername?: string;
  errorEmail?: string;
  errorPass?: string;
  errorDepartment: boolean = false;
  
  // Success/Error states
  userCreated: boolean = false;
  userTaken: boolean = false;

  // Computed error messages to avoid function calls in template
  get usernameErrorMessage(): string {
    switch(this.errorUsername) {
      case 'empty': return 'El nombre de usuario es obligatorio';
      case 'invalid': return 'Solo se permiten letras y números';
      case 'short': return 'Mínimo 4 caracteres';
      case 'taken': return 'Este nombre de usuario ya existe';
      default: return '';
    }
  }

  get emailErrorMessage(): string {
    switch(this.errorEmail) {
      case 'empty': return 'El correo electrónico es obligatorio';
      case 'invalid': return 'Ingresa un correo válido';
      case 'taken': return 'Este correo ya está registrado';
      default: return '';
    }
  }

  get passwordErrorMessage(): string {
    switch(this.errorPass) {
      case 'empty': return 'La contraseña es obligatoria';
      case 'short': return 'Mínimo 8 caracteres';
      default: return '';
    }
  }

  get departmentErrorMessage(): string {
    return this.errorDepartment ? 'Selecciona tu departamento' : '';
  }

  constructor(
    private departmentService: DepartmentService,
    private cd: ChangeDetectorRef,
    private userService: UserService,
    public router: Router
  ) { }

  ngOnInit(): void {
    // Check if user is already logged in
    if(localStorage.getItem("id_token") != null){
      this.router.navigate(['/home']);
    }
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.isLoadingDepartments = true;
    this.departmentService.getDepartments().subscribe({
      next: (departments) => {
        this.isLoadingDepartments = false;
        if(departments.status == 404){
          console.error("Error 404: DEPARTMENTS NOT FOUND");
          return;
        }
        this.departments = departments;
        console.log('Departments loaded:', this.departments);
      },
      error: (error) => {
        this.isLoadingDepartments = false;
        console.error('Error loading departments:', error);
      }
    });
  }

  register(user: string, mail: string, password: string, department: string): void {
    // Reset previous states
    this.userCreated = false;
    this.userTaken = false;
    
    // Validate username
    if(user == undefined || user == ""){
      this.errorUsername = 'empty';
      this.validUsername = 'invalid';
    } else if(user.length < 4){
      this.errorUsername = 'short';
      this.validUsername = 'invalid';
    } else if(!/^[A-Za-z0-9]*$/.test(user)){
      this.errorUsername = 'invalid';
      this.validUsername = 'invalid';
    } else {
      this.errorUsername = undefined;
      this.validUsername = 'valid';
    }

    // Validate email
    if(mail == undefined || mail == ""){
      this.errorEmail = 'empty';
      this.validEmail = 'invalid';
    } else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
      this.errorEmail = 'invalid';
      this.validEmail = 'invalid';
    } else {
      this.errorEmail = undefined;
      this.validEmail = 'valid';
    }

    // Validate password
    if(password == undefined || password == ""){
      this.errorPass = 'empty';
      this.validPass = 'invalid';
    } else if(password.length < 8){
      this.errorPass = 'short';
      this.validPass = 'invalid';
    } else {
      this.errorPass = undefined;
      this.validPass = 'valid';
    }

    // Validate department
    if(department == undefined || department == "0" || department == ""){
      this.errorDepartment = true;
      this.validDepartment = 'invalid';
    } else {
      this.errorDepartment = false;
      this.validDepartment = 'valid';
    }

    // If there are validation errors, don't proceed
    if(this.errorUsername != undefined || this.errorEmail != undefined || 
       this.errorPass != undefined || this.errorDepartment == true){
      return;
    }

    // All validations passed, create user
    this.isLoading = true;
    const userToCreate: UserLogin = { 
      username: user, 
      email: mail, 
      password: password, 
      departmentId: department, 
      profileImg: '',
      postsIds: [], 
      chatsIds: [], 
      contactsUsernames: [], 
      messages: [], 
      status: 'Pending'
    };

    this.userService.createUser(userToCreate).subscribe({
      next: (response) => {
        this.isLoading = false;
        if(response.status == 409){
          this.validEmail = 'invalid';
          this.validUsername = 'invalid';
          this.userTaken = true;
        } else {
          this.userCreated = true;
          // Redirect to login after a delay
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Registration error:', error);
        this.userTaken = true;
      }
    });
  }
}
