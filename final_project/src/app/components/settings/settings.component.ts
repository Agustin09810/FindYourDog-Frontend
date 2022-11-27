import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

  constructor(
    private userService:UserService,
    private imageService:ImageByIdService,
    private departmentService:DepartmentService,
    private cd: ChangeDetectorRef
    ) { }

  currentUser?:User;
  profileImgUrl?:string;
  departments?:Department[];
  currentDepartmentId?:string;
  dissableButton: string = 'disabled';

  ngOnInit(): void {
    this.getCurrentUser();
    this.getDepartments();
  }

  getCurrentUser(){
    this.userService.getUser().subscribe(x => {
      this.currentUser = x;
      this.imageService.getImagesById(this.currentUser!.profileImg).subscribe(img => {
        if(img.status==404){
          console.error("Error 404: IMAGE NOT FOUND");
          return;
        }
        this.profileImgUrl = img.url});
    });
  }

  getDepartments(){
    this.departmentService.getDepartments().subscribe(departments =>{
      if(departments.status==404){
        console.error("Error 404: DEPARTMENTS NOT FOUND");
        return;
      }
       this.departments = departments
       this.currentDepartmentId = departments.find((x: { id: string | undefined; }) => x.id == this.currentUser?.departmentId)?.id; });
  }

  updateDepartment(department: string){
    if(this.currentUser){
      this.currentUser.departmentId = department
      this.userService.updateUser(this.currentUser).subscribe(
        x => {
          if(x.status==404){
            console.error("Error 404: USER NOT FOUND");
            return
          }
          this.currentDepartmentId = x.departmentId;
          window.location.reload();

        }
      );
    }
  }

  checkDepartment(department: string){
    if(this.currentUser){
      if(this.currentUser.departmentId == department){
        this.dissableButton = 'disabled';
        return true;
      }
      this.dissableButton = '';
      return false;
    }
    return false
  }
}
