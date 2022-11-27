import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { Department } from '../interfaces/Department';

@Injectable({
providedIn: 'root'
})
export class DepartmentService {

  private departmentsUrl = 'http://localhost:3000/api/v1/departments';


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
