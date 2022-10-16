
import { Component, NgModule, OnInit } from '@angular/core';
import { ZonesService } from 'src/app/services/zones.service';
import { Zone } from 'src/app/interfaces/Zone';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  zones:Zone[] = [];
  constructor(private getZones:ZonesService) { }
  ngOnInit(): void {
    this.getZones.getZones().subscribe(zoneRecived => this.zones = zoneRecived);
    console.log(this.zones + 'xddd');
  }



}
