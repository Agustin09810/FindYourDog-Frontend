import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Image } from 'src/app/interfaces/Image';


@Component({
  selector: 'app-post-carousel',
  templateUrl: './post-carousel.component.html',
  //encapsulation: ViewEncapsulation.None,
  styleUrls: ['./post-carousel.component.css']
})
export class PostCarouselComponent implements OnInit {

  @Input() postImages?:Image[];

  showNavigationArrows = false;
  showNavigationIndicators = false;
  constructor() { }

  ngOnInit(): void {
    console.log('url');
  }

}
