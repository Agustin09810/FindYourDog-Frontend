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
      console.log('grilla');
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
    console.log(this.dogPhotos);
    console.log('afuera del if')
    if(this.dogPhotos){
      console.log('dentro del if')
      if(this.dogPhotos[0]){
        console.log('recontra adentro del if')
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
}
