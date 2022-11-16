import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

import { ImageByIdService } from '../../../../services/image-by-id.service';
import { Image } from '../../../../interfaces/Image';
import { Post } from '../../../../interfaces/Post';
import { PostsService } from '../../../../services/posts.service';


class imageSnippet{
  constructor(public src: string, public file?: File){}
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
  id?: string;
  @Input() 
  get inputId(): string {return this.id!;}
  set inputId(id: string){
    this.id = id;
    console.log(this.id + 'Holanda');
    this.getImageToDisplay();
  }
  @Input() post?: Post;


  //BORRAR
  idNumber: string = 'random';
  
  constructor(
    private imageService: ImageByIdService,
    private postService: PostsService,
  ) { }

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
    if(this.id!){
      console.log(this.id);
      this.imageService.deleteImage(this.id!).subscribe();
      //find element in post photos array and replace with last element
      const index = this.post!.photos.indexOf(this.id!);
      const lastElement = this.post!.photos.length-1;
      const auxElement = this.post!.photos[index];
      this.post!.photos[index] = this.post!.photos[lastElement];
      this.post!.photos[lastElement] = auxElement;
      this.post!.photos.pop();
      this.postService.updatePost(this.post!).subscribe();
    }
    this.sendPhotoToCheck.emit('disabled');
  }

  getImageToDisplay(){
    console.log('hola');
    this.imageService.getImagesById(this.id!).subscribe(
      (image: Image) => {
        this.selectedFile = {src: image.url};
      }
    );
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
