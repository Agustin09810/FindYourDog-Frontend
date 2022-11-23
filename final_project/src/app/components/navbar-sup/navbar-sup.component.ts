import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar-sup',
  templateUrl: './navbar-sup.component.html',
  styleUrls: ['./navbar-sup.component.css']
})
export class NavbarSupComponent implements OnInit {

  @Input() text?: string;
  @Input() backArrow: boolean = false;

  constructor(
    private location: Location, private authService:AuthService
  ) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }

  logout(){
    this.authService.logout();
  }

}
