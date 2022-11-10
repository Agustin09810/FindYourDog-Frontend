import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { UploadButtonComponent } from  './upload-button/upload-button.component'
import { Image } from '../../../interfaces/Image';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'], 
})
export class ImageUploadComponent implements OnInit {

  @ViewChild('imageSelector1') imageSelector1!: UploadButtonComponent;
  @ViewChild('imageSelector2') imageSelector2!: UploadButtonComponent;
  @ViewChild('imageSelector3') imageSelector3!: UploadButtonComponent;
  @ViewChild('imageSelector4') imageSelector4!: UploadButtonComponent;
  @ViewChild('imageSelector5') imageSelector5!: UploadButtonComponent;
  @ViewChild('imageSelector6') imageSelector6!: UploadButtonComponent;

  @Output() sendImagesToCheck = new EventEmitter<string>

  @Input() dogName?: string 
  constructor(
  ) { }
  
  ngOnInit(): void {
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
}
