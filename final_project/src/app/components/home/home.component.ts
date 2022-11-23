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
  currentUsername?:string;
  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
      this.userService.getUser().subscribe(user => {
        this.currentUsername = user?.username;
        this.departmentId = user?.departmentId;
        console.log(this.departmentId);
        console.log(user);
      });
  }

}
