import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { ZonesService } from 'src/app/services/zones.service';
import { ZoneComponent } from '../zone/zone.component';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  zones:Zone[] = [];
  constructor(private getZones:ZonesService) { }

  ngOnInit(): void {
    this.getZones.getZones().subscribe(zonesRecived => {
      this.zones = zonesRecived;
    })
  }

}
