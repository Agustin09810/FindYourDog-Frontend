import { Component, OnInit, AfterViewInit, Input, Output, ChangeDetectorRef, EventEmitter } from '@angular/core';

import {Zone} from '../../../interfaces/Zone';
import {ZonesService} from '../../../services/zones.service';

@Component({
  selector: 'app-dog-date-zone',
  templateUrl: './dog-date-zone.component.html',
  styleUrls: ['./dog-date-zone.component.css']
})
export class DogDateZoneComponent implements OnInit, AfterViewInit {

  @Input() dogName?: string;
  @Input() lastSeenDate?: string;
  @Input() lastSeenHour?: string;
  @Input() lostZone?: string;
  @Input() ubiDetails?: string

  @Input() counterOfChars: number = 0;

  @Output() nextStep = new EventEmitter<string[]>();
  
  zones: Zone[] = [];
  disableButton: string = "disabled";

  constructor(
    private zonesService: ZonesService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getZones();
  }

  ngAfterViewInit(): void {
    if(this.lastSeenDate != undefined && this.lastSeenHour != undefined && this.lostZone != undefined){
      if(this.verifyDate(this.lastSeenDate, this.lastSeenHour, 1)){
        this.disableButton = "active";
      }
    }
    this.cd.detectChanges();
  }

  getZones(): void{
    this.zonesService.getZones().subscribe(zones => this.zones = zones);
  }

  verifyDate(date: string, hour:string, selectedIndex:number): boolean{
    let dateAux = new Date(date);
    let today = new Date();
    if(date==""){
      this.disableButton = "disabled";
      return false;
    }
    if(hour == ""){
      this.disableButton = "disabled";
      return false;
    }
    if(selectedIndex == 0){
      this.disableButton = "disabled";
      return false;
    }
    if(dateAux.getFullYear() > today.getFullYear()){
      this.disableButton = "disabled";
      return false;
    }
    else if(dateAux.getFullYear() < today.getFullYear()){
      this.disableButton = "active";
      return true;
    }
    else{
      if(dateAux.getMonth() > today.getMonth()){
        this.disableButton = "disabled";
        return false;
      }
      else if(dateAux.getMonth() < today.getMonth()){
        this.disableButton = "active";
        return true;
      }
      else{
        if(dateAux.getDate()+1 > today.getDate()){
          this.disableButton = "disabled";
          return false;
        }
        else if(dateAux.getDate()+1 < today.getDate()){
          this.disableButton = "active";
          return true;
        }
        else{
            if(parseInt(hour.substring(0,2)) > today.getHours()){
              this.disableButton = "disabled";
              return false;
            }
            else if(parseInt(hour.substring(0,2)) < today.getHours()){
              this.disableButton = "active";
              return true;
            }
            else{
              if(parseInt(hour.substring(3,5)) > today.getMinutes()){
                this.disableButton = "disabled";
                return false;
              }
            }
        }
      }
    }
    this.disableButton = "active";
    return true;
  }

  countCharacters(event: any){
    this.counterOfChars = event.length;
  }

  nextStepFunction(date:string, hour: string, zone: string, ubiDetails: string): void {
    let toEmit: string[] = [];
    toEmit.push("photos");
    toEmit.push(date)
    toEmit.push(hour)
    toEmit.push(zone)
    if(ubiDetails != ''){
      toEmit.push(ubiDetails)
    }
    this.nextStep.emit(toEmit);
  }

  lastStepFunction(): void {
    let toEmit: string[] = [];
    toEmit.push("breed");
    this.nextStep.emit(toEmit);
  }

}
