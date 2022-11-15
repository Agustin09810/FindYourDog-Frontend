import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ImageByIdService } from '../../../../services/image-by-id.service';
import { Image } from '../../../../interfaces/Image';


class imageSnippet{
  constructor(public src: string, public file: File){}
}

@Component({
  selector: 'app-upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.css']
})
export class UploadButtonComponent implements OnInit {

  @Input() selectedFile?: imageSnippet;
  @Output() sendPhotoToCheck = new EventEmitter<string>();
  @Input() imageToUpload: Image|undefined = undefined;
  idNumber: string = 'random';
  
  constructor() { }

  ngOnInit(): void {
    this.idNumber = this.randomID(15);
  }

  async processFile(imageInput: any){
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new imageSnippet(event.target.result, file);
      this.imageToUpload = {id: this.idNumber, url: this.selectedFile.src};
      this.sendPhotoToCheck.emit('active')
      });
    reader.readAsDataURL(file);
  }

  deleteFile(): void{
    this.selectedFile = undefined;
    this.imageToUpload = undefined;
    this.sendPhotoToCheck.emit('disabled');
  }

  randomID(length: number): string {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

}
