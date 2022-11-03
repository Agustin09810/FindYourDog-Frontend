import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Department } from '../interfaces/Department';

const departmentUrl = 'api/departments';
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http:HttpClient) { }

  
  getDepartments(){
    return this.http.get<Department[]>(departmentUrl);
  }

  getDepartmentById(id:string){
    let url:string = departmentUrl + `/${id}`;
    return this.http.get<Department>(url);
  }
}
