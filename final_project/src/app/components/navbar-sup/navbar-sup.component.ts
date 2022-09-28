import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbar-sup',
  templateUrl: './navbar-sup.component.html',
  styleUrls: ['./navbar-sup.component.css']
})
export class NavbarSupComponent implements OnInit {

  @Input() text?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
