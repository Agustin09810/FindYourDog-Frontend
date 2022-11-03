import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route:ActivatedRoute, private userService:UserService) { }
  departmentId?:string ;
  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    const id = this.route.snapshot.paramMap.get('userId');
    if(id){
      this.userService.getUserById(id).subscribe(user => {
        this.departmentId = user?.departmentId;
        console.log(this.departmentId);
      });
    }
  }

}
