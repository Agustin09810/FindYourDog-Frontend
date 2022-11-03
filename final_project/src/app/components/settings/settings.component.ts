import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { ImageByIdService } from 'src/app/services/image-by-id.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private userService:UserService, private route:ActivatedRoute, private imageService:ImageByIdService) { }

  currentUser?:User;
  profileImgUrl?:string;

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(){
    const id = this.route.snapshot.paramMap.get('userId');
    if(id){
      this.userService.getUserById(id).subscribe(user => {
        this.currentUser = user;
        this.imageService.getImagesById(this.currentUser!.profileImg).subscribe(imageUrl => this.profileImgUrl = imageUrl?.imageUrl);
      });
    }
  }

}
