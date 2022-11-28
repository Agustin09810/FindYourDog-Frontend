import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Image } from 'src/app/interfaces/Image';


@Component({
  selector: 'app-post-carousel',
  templateUrl: './post-carousel.component.html',
  styleUrls: ['./post-carousel.component.css']
})
export class PostCarouselComponent implements OnInit {

  @Input() postImages?:Image[];
  currentImage?:Image;
  count:number = 0;

  constructor() { }

  ngOnInit(): void {
    this.currentImage = this.postImages?.at(0);
  }

  next(){
    if(this.count < this.postImages!.length-1){
      this.count++;
      this.currentImage = this.postImages!.at(this.count);
    }
  }

  previous(){
    {
      if(this.count > 0){
        this.count--;
        this.currentImage = this.postImages!.at(this.count);
      }
    }
  }

}
