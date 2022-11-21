import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ChangeDetectorRef} from '@angular/core';
import { ImageUploadComponent } from  '../image-upload/image-upload.component'
import { Image} from '../../../interfaces/Image';
import { ImageByIdService } from '../../../services/image-by-id.service';
import { lastValueFrom } from 'rxjs';

import {Post} from '../../../interfaces/Post';

@Component({
  selector: 'app-dog-photos',
  templateUrl: './dog-photos.component.html',
  styleUrls: ['./dog-photos.component.css']
})
export class DogPhotosComponent implements OnInit {

  constructor(
    private imageService: ImageByIdService,
    private cd: ChangeDetectorRef
  ) { }

  @Input() dogName?: string;
  @Input() dogPhotos?: string[];
  @Input() dogDescription?: string;
  
  @Output() nextStep = new EventEmitter<string[]>();
  @Output() editPost = new EventEmitter<string[]>();

  @ViewChild('imageUploadComponent') imageUploadComponent!: ImageUploadComponent;

  @Input() counterOfChars: number = 0;
  disableButton: string = 'disabled';

  @Input() editBool: boolean = false;
  @Input() post?: Post;

  ngOnInit(): void {
    if(this.editBool){
      this.disableButton = 'active';
    }
  }

  countCharacters(event: any){
    this.counterOfChars = event.length;
  }

  lastStepFunction(): void {
    this.nextStep.emit(["date"]);
  }

  checkIfButtonShouldBeDisabled(): void {
    let images: Image[] =  this.imageUploadComponent.checkAndSendImages();
    this.cd.detectChanges();
    if(images.length > 0){
      this.disableButton = 'active';
    }
    else{
      this.disableButton = 'disabled';
    }
    this.cd.detectChanges();
  }

  async editPostFunction(textArea: string) {
    let images: Image[] =  this.imageUploadComponent.checkAndSendImagesToEdit();
    let photosIDs: string[] = [];
    photosIDs.push(textArea);
    for(let image of images){
      if(!this.dogPhotos!.includes(image.id)){
      const result: Image = await lastValueFrom(this.imageService.uploadImage(image));
      photosIDs.push(result.id);
      }
    }
    this.editPost.emit(photosIDs)
  }

  async nextStepFunction(textArea: string) {
    let images: Image[] =  this.imageUploadComponent.checkAndSendImages();
    let photosIDs: string[] = [];
    photosIDs.push(textArea);
    for(let image of images){
      const result: Image = await lastValueFrom(this.imageService.uploadImage(image));
      photosIDs.push(result.id);
    }
    this.nextStep.emit(photosIDs)
  }
}
