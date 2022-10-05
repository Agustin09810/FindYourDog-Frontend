import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/interfaces/Message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  //chequear q el origin del mesagge sea diferente a mi asi pongo x estilo en el mesagge.
  @Input() message?:Message;//si hay problemas con el undefined se puede crear un msg que diga cargando mensaje etc.

  constructor() { }

  ngOnInit(): void {
  }

}
