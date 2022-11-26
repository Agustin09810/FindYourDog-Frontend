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

  getDayDiff(startDate: Date): string {
    const dateLost = new Date(startDate);

    var diff: number = new Date().getTime() - dateLost.getTime();
    
    if(diff > 1000*60*60*24){
      if(Math.trunc(diff/1000/60/60/24) === 1){
        return `Hace ${Math.trunc(diff/1000/60/60/24)} día`;
      }
      return `${Math.trunc(diff/1000/60/60/24)} días`;
    }else if(diff > 1000*60*60){
      if(Math.trunc(diff/1000/60/60) === 1){
        return `${Math.trunc(diff/1000/60/60)} hora`;
      }
      return `${Math.trunc(diff/1000/60/60)} horas`;
    }else if(diff > 1000*60){
      if(Math.trunc(diff/1000/60) === 1){
        return `${Math.trunc(diff/1000/60)} minuto`;
      }
      return `${Math.trunc(diff/1000/60)} minutos`;
    }else{
      return `Reciente`;
    }
  }

}
