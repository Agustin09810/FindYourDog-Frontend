import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/User';

@Component({
  selector: 'app-user-preview',
  templateUrl: './user-preview.component.html',
  styleUrls: ['./user-preview.component.css']
})
export class UserPreviewComponent implements OnInit {

  constructor() { }

  @Input() user?:User;

  ngOnInit(): void {
  }

  //limitar el tamaño del username mostrado y ddel last msg mostrado.

}
