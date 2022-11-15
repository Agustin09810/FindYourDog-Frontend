import { Component, OnInit, Input } from '@angular/core';

import { Image } from 'src/app/interfaces/Image';
import { Post } from 'src/app/interfaces/Post';
import { ImageByIdService } from 'src/app/services/image-by-id.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post!: Post;
  firstPhoto?: Image;


  constructor(
    private imgService:ImageByIdService
  ) { }

  ngOnInit(): void {
    this.imgService.getImagesById(this.post.photos[0]).subscribe(x => this.firstPhoto = x);
  }

  getDayDiff(startDate: Date): number {
    const msInDay = 24 * 60 * 60 * 1000;
    const dateLost = new Date(startDate);

    var time = new Date().getTime() - dateLost.getTime();
    
    const days = Math.floor(time / msInDay);

    return days;
  }

}
