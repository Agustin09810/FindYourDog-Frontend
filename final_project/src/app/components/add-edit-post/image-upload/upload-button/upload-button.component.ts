import { Component, OnInit, Input } from '@angular/core';

import { ImageByIdService } from '../../../../services/image-by-id.service';


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
  idNumber: string = 'random';
  
  constructor(private imageService:ImageByIdService) { }

  ngOnInit(): void {
    this.idNumber = this.randomID(15);
  }

  processFile(imageInput: any){
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new imageSnippet(event.target.result, file);
      this.imageService.uploadImage(this.selectedFile.file);
      });

    reader.readAsDataURL(file);
  }

  deleteFile(): void{
    this.selectedFile = undefined;
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
