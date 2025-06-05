import { Component, Directive, ElementRef, OnInit, ViewChild, } from '@angular/core';
import { LoginButtonComponent } from './login-button/login-button.component';
import { LoginInputComponent } from './login-input/login-input.component';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild(LoginInputComponent, {static : true}) childInput! : LoginInputComponent;
  
  errorUsername: boolean = false;
  errorPassword: boolean = false;
  errorDisplay?: string;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem("id_token") != null){
      this.router.navigate(['/home']);
    }
  }

  getData() {
    const pass = this.childInput.getPassword();
    const user = this.childInput.getUsername();
    this.loginCheck(user, pass);
  }

  loginCheck(username: string, password: string) {
    // Reset errors
    this.errorUsername = false;
    this.errorPassword = false;
    this.errorDisplay = undefined;

    // Validate inputs
    if(username == "" || username == undefined){
      this.errorUsername = true;
    }

    if(password == "" || password == undefined){
      this.errorPassword = true; 
    }

    // Set error messages
    if(this.errorUsername && this.errorPassword){
      this.errorDisplay = "emptyBoth";
      return;
    }
    else if(this.errorUsername && !this.errorPassword){
      this.errorDisplay = "emptyUsername";
      return;
    }
    else if(this.errorPassword && !this.errorUsername){
      this.errorDisplay = "emptyPassword";
      return;
    }

    // If validation passes, attempt login
    if(!this.errorUsername && !this.errorPassword){
      this.isLoading = true;
      this.authService.login(username, password).subscribe({
        next: (response) => {
          this.isLoading = false;
          if(response.status == 404){
            this.errorDisplay = "invalid";
          }
          else if(response.status == 401){
            this.errorDisplay = "nonAuthorized";
          }
          else {
            this.router.navigate(['/home']);
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorDisplay = "connectionError";
          console.error('Login error:', error);
        }
      });
    } 
  }

  getErrorMessage(): string {
    switch(this.errorDisplay) {
      case "emptyBoth":
        return "Por favor ingresa tu usuario y contraseña";
      case "emptyUsername":
        return "Por favor ingresa tu nombre de usuario";
      case "emptyPassword":
        return "Por favor ingresa tu contraseña";
      case "invalid":
        return "Usuario o contraseña incorrectos";
      case "nonAuthorized":
        return "No tienes autorización para acceder";
      case "connectionError":
        return "Error de conexión. Intenta nuevamente";
      default:
        return "";
    }
  }
}
