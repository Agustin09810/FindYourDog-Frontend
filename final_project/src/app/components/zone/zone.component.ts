import { Component, OnInit, Input } from '@angular/core';
import { Image } from 'src/app/interfaces/Image';
import { Zone } from 'src/app/interfaces/Zone';
import { ImageByIdService } from 'src/app/services/image-by-id.service';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.css']
})
export class ZoneComponent implements OnInit {

  @Input() zone?: Zone;
  img?: Image;

  constructor(private imgService:ImageByIdService) { }

  ngOnInit(): void {
    this.imgService.getImagesById(this.id).subscribe(x => this.img = x);
    console.log(this.img?.imageId + 'asdasd');
  }

  nombre: string = 'Centro';
  id:string = '1';







}
