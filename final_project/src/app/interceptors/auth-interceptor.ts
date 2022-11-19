import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import {catchError} from 'rxjs/operators';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthInterceptor{

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {
        
    const token = localStorage.getItem('id_token');
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', token)
      });
      return next.handle(cloned).pipe(
        catchError((err) => {
          if (err.status === 401) {
            this.authService.logout();
            this.router.navigate(['/login']);
          }else if(err.status === 500){
            this.router.navigate(['/error500']);
          }
          throw err;
        }));
    }
    else {
      return next.handle(req).pipe(
        catchError((err) => {
          if (err.status === 401) {
            this.router.navigate(['/login']);
          }else if(err.status === 500){
            this.router.navigate(['/error500']);
          }
          throw err;
        }));;
    }
  }
}
