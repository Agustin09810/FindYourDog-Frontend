import { Component, Input, OnInit } from '@angular/core';
import { Image } from 'src/app/interfaces/Image';


@Component({
  selector: 'app-post-carousel',
  templateUrl: './post-carousel.component.html',
  styleUrls: ['./post-carousel.component.css']
})
export class PostCarouselComponent implements OnInit {

  @Input() firstImage!:Image;
  @Input() otherImages!:Image[];

  constructor() { }

  ngOnInit(): void {
  }

}
