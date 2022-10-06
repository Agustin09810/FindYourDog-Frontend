import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Message } from 'src/app/interfaces/Message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, AfterViewInit {
  //chequear q el origin del mesagge sea diferente a mi asi pongo x estilo en el mesagge.
  @Input() message?:Message;//si hay problemas con el undefined se puede crear un msg que diga cargando mensaje etc.
  @Input() localUsername?: string;
  @ViewChild('msg') msgDiv?: ElementRef;

  constructor() { }

  ngOnInit(): void {
    
  }

  //Despues de que se inicia completamente la vista del componente.
  ngAfterViewInit() { 
    if(this.localUsername === this.message?.originUsername) {
      console.log('1');
      this.msgDiv?.nativeElement.classList.add('messageSent');
    }else{
      console.log('2');
      this.msgDiv?.nativeElement.classList.add('messageRecived');
    }
  }

}
