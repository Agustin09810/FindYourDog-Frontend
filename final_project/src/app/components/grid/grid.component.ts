import { Component, Input, NgModule, OnInit } from '@angular/core';
import { ZonesService } from 'src/app/services/zones.service';
import { Zone } from 'src/app/interfaces/Zone';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/User';
import { DepartmentService } from 'src/app/services/department.service';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  @Input() departmentId?:string;
  @Input() username?:string;
  
  zones?:Zone[];
  constructor(private zoneService:ZonesService, private departmentService:DepartmentService) { }
  ngOnInit(): void {
    this.loadZones();
  }

  loadZones(){
    if(this.departmentId){
      this.departmentService.getDepartmentById(this.departmentId).subscribe(department => {
        if(department.status==404){
          console.error(`Error ${department.status}: DEPARTMENT ${this.departmentId} NOT FOUND`);
          return;
        }
        department.zonesIds.forEach((zoneId: string) => {
          this.zoneService.getZone(zoneId).subscribe(zone => {
            if(zone.status==404){
              console.error(`Error ${zone.status}: ZONE ${zoneId} NOT FOUND`);
              return;
            }
            if(!this.zones){
              this.zones = [];
            }
            this.zones.push(zone)});
        });
      })
    }
  }

  // TrackBy function for better performance
  trackByZoneId(index: number, zone: Zone): string {
    return zone.id;
  }
}
