
import { Component, OnInit, Input, NgModule } from '@angular/core';
import { Image } from 'src/app/interfaces/Image';
import { Zone } from 'src/app/interfaces/Zone';
import { ImageByIdService } from 'src/app/services/image-by-id.service';


@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.css']
})
export class ZoneComponent implements OnInit {

  @Input() zone!: Zone;
  @Input() username?:string;
  img?: Image;

  constructor(private imgService:ImageByIdService) { }

  ngOnInit(): void {
    this.imgService.getImagesById(this.zone.imgId).subscribe(x => this.img = x);
  }

  







}
