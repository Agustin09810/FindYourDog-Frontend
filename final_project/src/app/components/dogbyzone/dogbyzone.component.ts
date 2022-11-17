import { Component, OnInit, Input } from '@angular/core';
import { ZonesService } from '../../services/zones.service';
import { Zone } from '../../interfaces/Zone'; 

import { ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-dogbyzone',
  templateUrl: './dogbyzone.component.html',
  styleUrls: ['./dogbyzone.component.css']
})
export class DogbyzoneComponent implements OnInit {

  @Input() zone!: Zone | undefined;

  constructor(
    private zoneService: ZonesService,
    private route: ActivatedRoute
  ) { }
  
  ngOnInit(): void {
    this.getZoneById();
  }

  getZoneById(): void {
    const id = this.route.snapshot.paramMap.get('zoneId');
    if(id)
      {
        this.zoneService.getZone(id).subscribe(zone => {
          this.zone = zone;
        });
        
      }
  }



}
