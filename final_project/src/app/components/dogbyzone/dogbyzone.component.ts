import { Component, OnInit, Input, HostListener, Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common';
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
  showButton: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
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
          if(zone.status == 404){
            console.error(`Error 404: ZONE ${id} NOT FOUND`);
            return;
          }
          this.zone = zone;
        });
      }
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    const yOffSet = window.pageYOffset;
    const scrollTop = this.document.documentElement.scrollTop;
    this.showButton = (yOffSet || scrollTop) > 100;
  }
  onScrollTop(): void{
    this.document.documentElement.scrollTop = 0;
  }



}
