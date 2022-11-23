import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-confirmed',
  templateUrl: './confirmed.component.html',
  styleUrls: ['./confirmed.component.css']
})
export class ConfirmedComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getToken();
  }

  getToken(): void{
    const token:string|null = this.route.snapshot.paramMap.get('code');
    if(token){
    this.userService.confirmUser(token).subscribe();
    }
    else{
      console.log('No token');
    }
  }

  
}
