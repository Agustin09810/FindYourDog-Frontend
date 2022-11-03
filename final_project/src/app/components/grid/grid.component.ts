
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
  zones:Zone[] = [];
  constructor(private zoneService:ZonesService, private departmentService:DepartmentService) { }
  ngOnInit(): void {
    this.loadZones();
    console.log(this.departmentId);
  }

  loadZones(){
    if(this.departmentId){
      console.log('xd');
      this.departmentService.getDepartmentById(this.departmentId).subscribe(department => {
        department.zonesId.forEach(zoneId => {
          this.zoneService.getZone(zoneId).subscribe(zone => this.zones.push(zone));
        });
      })
    }
  }

  



}
