import { Component, OnInit, Input, ViewChild, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { UploadButtonComponent } from  './upload-button/upload-button.component'
import { Image } from '../../../interfaces/Image';
import { Post } from '../../../interfaces/Post';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'], 
})
export class ImageUploadComponent implements OnInit, AfterViewInit {

  @ViewChild('imageSelector1') imageSelector1!: UploadButtonComponent;
  @ViewChild('imageSelector2') imageSelector2!: UploadButtonComponent;
  @ViewChild('imageSelector3') imageSelector3!: UploadButtonComponent;
  @ViewChild('imageSelector4') imageSelector4!: UploadButtonComponent;
  @ViewChild('imageSelector5') imageSelector5!: UploadButtonComponent;
  @ViewChild('imageSelector6') imageSelector6!: UploadButtonComponent;

  @Output() sendImagesToCheck = new EventEmitter<string>

  @Input() dogName?: string 
  dogPhotos?: string[];
  @Input()
  get dogPhotosIds(): string[] {return this.dogPhotos!}
  set dogPhotosIds(value: string[]) {
    this.dogPhotos = value;
  }

  @Input() post?: Post
  constructor(
  ) { }
  
  ngOnInit(): void {
  }

  ngAfterViewInit():void {
    if(this.dogPhotos!=undefined){
      this.loadImages();
    }
  }

  emitter(): void{
    this.sendImagesToCheck.emit("activate");
  }

  checkAndSendImages(): Image[]{
    let images: Image[] = [];
    if(this.imageSelector1.imageToUpload){
      images.push(this.imageSelector1.imageToUpload)}
    if(this.imageSelector2.imageToUpload){
      images.push(this.imageSelector2.imageToUpload)}
    if(this.imageSelector3.imageToUpload){
      images.push(this.imageSelector3.imageToUpload)}
    if(this.imageSelector4.imageToUpload){
      images.push(this.imageSelector4.imageToUpload)}
    if(this.imageSelector5.imageToUpload){
      images.push(this.imageSelector5.imageToUpload)}
    if(this.imageSelector6.imageToUpload){
      images.push(this.imageSelector6.imageToUpload)}
    return images;
  }

  
  
  loadImages(): void{
    if(this.dogPhotos){
      if(this.dogPhotos[0]){
        this.imageSelector1.inputId = this.dogPhotos[0];
      }
      if(this.dogPhotos[1]){
        this.imageSelector2.inputId = this.dogPhotos[1];
      }
      if(this.dogPhotos[2]){
        this.imageSelector3.inputId = this.dogPhotos[2];
      }
      if(this.dogPhotos[3]){
        this.imageSelector4.inputId = this.dogPhotos[3];
      }
      if(this.dogPhotos[4]){
        this.imageSelector5.inputId = this.dogPhotos[4];
      }
      if(this.dogPhotos[5]){
        this.imageSelector6.inputId = this.dogPhotos[5];
      }
    }
  }
    checkAndSendImagesToEdit(): Image[]{
      let images: Image[] = [];
      if(this.imageSelector1.imageToUpload){
        images.push(this.imageSelector1.imageToUpload)
      } else if(this.imageSelector1.inputId){
        let aux1: Image = {id: this.imageSelector1.inputId, url: ''}
        images.push(aux1)
      }
      if(this.imageSelector2.imageToUpload){
        images.push(this.imageSelector2.imageToUpload)
      } else if(this.imageSelector2.inputId){
        let aux2: Image = {id: this.imageSelector2.inputId, url: ''}
        images.push(aux2)
      }
      if(this.imageSelector3.imageToUpload){
        images.push(this.imageSelector3.imageToUpload)
      } else if(this.imageSelector3.inputId){
        let aux3: Image = {id: this.imageSelector3.inputId, url: ''}
        images.push(aux3)
      }
      if(this.imageSelector4.imageToUpload){
        images.push(this.imageSelector4.imageToUpload)
      } else if(this.imageSelector4.inputId){
        let aux4: Image = {id: this.imageSelector4.inputId, url: ''}
        images.push(aux4)
      }
      if(this.imageSelector5.imageToUpload){
        images.push(this.imageSelector5.imageToUpload)
      } else if(this.imageSelector5.inputId){
        let aux5: Image = {id: this.imageSelector5.inputId, url: ''}
        images.push(aux5)
      }
      if(this.imageSelector6.imageToUpload){
        images.push(this.imageSelector6.imageToUpload)
      } else if(this.imageSelector6.inputId){
        let aux6: Image = {id: this.imageSelector6.inputId, url: ''}
        images.push(aux6)
      }
      return images;
    }
}
