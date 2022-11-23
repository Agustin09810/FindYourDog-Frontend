import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../interfaces/Department';

@Injectable({
providedIn: 'root'
})
export class DepartmentService {

  private departmentsUrl = 'http://localhost:3000/api/v1/departments';


  constructor(
    private http:HttpClient,
    ) { 
    }

  
  getDepartments(){
    return this.http.get<Department[]>(this.departmentsUrl);
  }

  getDepartmentById(id:string){
    let url:string = this.departmentsUrl + `/${id}`;
    return this.http.get<Department>(url);
  }

  getDepartmentsNoAuth(): Observable<Department[]>{
    return this.http.get<Department[]>(this.departmentsUrl, { headers: { 'skip': 'true' } });
  }
}
