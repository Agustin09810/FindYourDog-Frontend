import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Message } from 'src/app/interfaces/Message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, AfterViewInit {
  @Input() message?:Message;
  @Input() localUsername?: string;
  @ViewChild('msg') msgDiv?: ElementRef;
  messageDate?: string;

  constructor() { }

  ngOnInit(): void {
    this.messageDate = this.calculateTime(this.message!.date);
  }

  ngAfterViewInit() { 
    if(this.localUsername === this.message?.originUsername) {
      this.msgDiv?.nativeElement.classList.add('messageSent');
    }else{
      this.msgDiv?.nativeElement.classList.add('messageRecived');
    }
  }

  calculateTime(date: Date): string{
    if(date){
      let diff = new Date().getTime() - new Date(date).getTime();  
      if(diff > 1000*60*60*24){
        if(Math.trunc(diff/1000/60/60/24) === 1){
          return `Hace ${Math.trunc(diff/1000/60/60/24)} día`;
        }
        return `${Math.trunc(diff/1000/60/60/24)} días`;
      }else if(diff > 1000*60*60){
        if(Math.trunc(diff/1000/60/60) === 1){
          return `${Math.trunc(diff/1000/60/60)} hora`;
        }
        return `${Math.trunc(diff/1000/60/60)} horas`;
      }else if(diff > 1000*60){
        if(Math.trunc(diff/1000/60) === 1){
          return `${Math.trunc(diff/1000/60)} minuto`;
        }
        return `${Math.trunc(diff/1000/60)} minutos`;
      }else{
        return `Reciente`;
      }
      
    }
    return '';
    
  }
  

}
