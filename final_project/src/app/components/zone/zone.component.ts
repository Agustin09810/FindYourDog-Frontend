import { Component, OnInit, Input } from '@angular/core';
import { Zone } from 'src/app/interfaces/Zone';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.css']
})
export class ZoneComponent implements OnInit {

  @Input() zone?: Zone;

  constructor() { }

  ngOnInit(): void {
  }

  nombre: string = 'Centro';
  img: string = '../../../assets/images/img3.jpg';
  //llamar al servicio getImageById devuleve ruta img




}
