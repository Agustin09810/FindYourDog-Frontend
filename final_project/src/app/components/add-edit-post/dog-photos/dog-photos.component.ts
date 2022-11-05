import { Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import { ImageUploadComponent } from  '../image-upload/image-upload.component'

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

  @ViewChild('imageUploadComponent') imageUploadComponent!: ImageUploadComponent;

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

  //FALTA HACER ESTO Y ESTARIA
 /*  nextStepFunction(): void {
    let photos: () => string[] = this.imageUploadComponent.checkAndSendImages;
    this.nextStep.emit(photos);
  } */
}
