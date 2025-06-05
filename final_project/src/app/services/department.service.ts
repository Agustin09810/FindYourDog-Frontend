import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { Department } from '../interfaces/Department';
import { BACKEND_PROD } from './constants';

@Injectable({
providedIn: 'root'
})
export class DepartmentService {

  private departmentsUrl = BACKEND_PROD + '/api/v1/departments';


  constructor(
    private http:HttpClient,
    ) {}
  
  getDepartments(){
    return this.http.get<Department[]>(this.departmentsUrl).pipe(
      catchError( err => { return of(err)})
    );
  }

  getDepartmentById(id:string){
    let url:string = this.departmentsUrl + `/${id}`;
    return this.http.get<Department>(url).pipe(
      catchError( err => { return of(err)})
    );
  }
}
