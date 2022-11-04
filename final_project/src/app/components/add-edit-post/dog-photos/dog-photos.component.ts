import { Component, OnInit, Input, Output, EventEmitter,  } from '@angular/core';

@Component({
  selector: 'app-dog-photos',
  templateUrl: './dog-photos.component.html',
  styleUrls: ['./dog-photos.component.css']
})
export class DogPhotosComponent implements OnInit {

  constructor() { }

  @Input() dogName?: string;
  dogPhotos?: string[];
  
  @Output() nextStep = new EventEmitter<string[]>();

  @Input() counterOfChars: number = 0;
  disableButton: string = 'disabled';

  ngOnInit(): void {
  }

  countCharacters(event: any){
    this.counterOfChars = event.length;
  }

  changeButtonState(): void {
  //Si hay al menos una foto, habilitar el botón
   /*  if() {
      this.disableButton = "active";
    }
    else{
      this.disableButton = "disabled";
    } */
  }
  lastStepFunction(): void {
    this.nextStep.emit(["date"]);
  }

  nextStepFunction(): void {
    let toEmit: string[] = [];
    
    this.nextStep.emit(toEmit);
  }
}
