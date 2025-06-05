import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Image } from 'src/app/interfaces/Image';


@Component({
  selector: 'app-post-carousel',
  templateUrl: './post-carousel.component.html',
  styleUrls: ['./post-carousel.component.css']
})
export class PostCarouselComponent implements OnInit {

  @Input() postImages?: Image[];
  currentImage?: Image;
  currentIndex: number = 0;
  isLoading: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (this.postImages && this.postImages.length > 0) {
      this.currentImage = this.postImages[0];
      this.currentIndex = 0;
    }
  }

  next(): void {
    if (this.postImages && this.currentIndex < this.postImages.length - 1) {
      this.currentIndex++;
      this.currentImage = this.postImages[this.currentIndex];
    }
  }

  previous(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.currentImage = this.postImages![this.currentIndex];
    }
  }

  goToImage(index: number): void {
    if (this.postImages && index >= 0 && index < this.postImages.length) {
      this.currentIndex = index;
      this.currentImage = this.postImages[index];
    }
  }

  onImageError(event: any): void {
    event.target.src = 'assets/images/default-dog-placeholder.svg';
  }

}
