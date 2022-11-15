import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Department } from 'src/app/interfaces/Department';
import { User } from 'src/app/interfaces/User';
import { DepartmentService } from 'src/app/services/department.service';
import { ImageByIdService } from 'src/app/services/image-by-id.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private userService:UserService, private route:ActivatedRoute, private imageService:ImageByIdService, private departmentService:DepartmentService) { }

  currentUser?:User;
  profileImgUrl?:string;
  departments?:Department[];

  ngOnInit(): void {
    this.getCurrentUser();
    this.getDepartments();
  }

  getCurrentUser(){
    const id = this.route.snapshot.paramMap.get('userId');
    if(id){
      this.userService.getUserById(id).subscribe(user => {
        this.currentUser = user;
        this.imageService.getImagesById(this.currentUser!.profileImg).subscribe(url => this.profileImgUrl = url?.url);
      });
    }
  }

  getDepartments(){
    this.departmentService.getDepartments().subscribe(departments => this.departments = departments);
  }

  updateDepartment(department:Department){
    if(this.currentUser){
      this.currentUser.departmentId = department.id;
      this.userService.updateDepartment(this.currentUser).subscribe();
      //this.userService.getUserById(this.currentUser.id).subscribe(user => console.log(user?.departmentId + ' obtenido'));
    }
  }

}
