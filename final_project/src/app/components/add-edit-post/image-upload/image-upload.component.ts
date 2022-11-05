import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { UploadButtonComponent } from  './upload-button/upload-button.component'
import { ImageByIdService } from '../../../services/image-by-id.service';

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

  @Output() sendImages = new EventEmitter<string[]>

  @Input() dogName?: string 
  constructor(
    private imageService: ImageByIdService
  ) { }
  
  ngOnInit(): void {
  }

  checkAndSendImages(): string[]{
    let imagesIds: string[] = []
    if(this.imageSelector1.imageToUpload){
      this.imageService.uploadImage(this.imageSelector1.imageToUpload).subscribe(
        x => { imagesIds.push(this.imageSelector1.imageToUpload!.imageId) }
      )
    }
    if(this.imageSelector2.imageToUpload){
      this.imageService.uploadImage(this.imageSelector2.imageToUpload).subscribe(
        x => { imagesIds.push(this.imageSelector2.imageToUpload!.imageId) }
      )
    }
    if(this.imageSelector3.imageToUpload){
      this.imageService.uploadImage(this.imageSelector3.imageToUpload).subscribe(
        x => { imagesIds.push(this.imageSelector3.imageToUpload!.imageId) }
      )
    }
    if(this.imageSelector4.imageToUpload){
      this.imageService.uploadImage(this.imageSelector4.imageToUpload).subscribe(
        x => { imagesIds.push(this.imageSelector4.imageToUpload!.imageId) }
      )
    }
    if(this.imageSelector5.imageToUpload){
      this.imageService.uploadImage(this.imageSelector5.imageToUpload).subscribe(
        x => { imagesIds.push(this.imageSelector6.imageToUpload!.imageId) }
      )
    }
    if(this.imageSelector6.imageToUpload){
      this.imageService.uploadImage(this.imageSelector6.imageToUpload).subscribe(
        x => { imagesIds.push(this.imageSelector6.imageToUpload!.imageId) }
      )
    }
    return imagesIds;
  }
  
}
