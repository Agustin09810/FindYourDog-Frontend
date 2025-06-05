import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar-sup',
  templateUrl: './navbar-sup.component.html',
  styleUrls: ['./navbar-sup.component.css']
})
export class NavbarSupComponent implements OnInit {

  @Input() text?: string;
  @Input() backArrow: boolean = false;
  @Input() customBackRoute?: string;

  constructor(
    private location: Location, 
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goBack(): void {
    if (this.customBackRoute) {
      this.router.navigate([this.customBackRoute]);
    } else {
      this.location.back();
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
