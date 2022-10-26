import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-add-edit-post',
  templateUrl: './add-edit-post.component.html',
  styleUrls: ['./add-edit-post.component.css']
})
export class AddEditPostComponent implements OnInit {

  step: string = "date";
  todayDate: Date = new Date();
  today: string = this.todayDate.toISOString().substring(0,10);
  now: string = this.todayDate.getHours() + ':' + "00";
  textNavbar: string = "Publicar";

  @ViewChild('dogName') dogNameInput!: ElementRef;

  
  dogName: string = "";
  otherNames: string[] = [];
  lastSeenDate: string = "";
  lastSeenHour: string = "";
  dogBreed: string = "";
  additionalInfo: string = "";

  disableButton: string = "disabled";
  
  constructor(
    private deviceService: DeviceDetectorService,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  isMobile = this.deviceService.isMobile();
  isTablet = this.deviceService.isTablet();
  isDesktop = this.deviceService.isDesktop();
  
  ngOnInit(): void {
  }

  continue1(): void {
    this.step = "date";
    this.textNavbar = "Fecha";
    this.dogName = this.dogNameInput.nativeElement.value;
  }

  continue2(): void {
    this.step = "breed";
    this.textNavbar = "Raza";
  }

  goBack1(): void {
    this.step = "name";
    this.textNavbar = "Publicar";
  }

  goBack(): void {
    this.location.back();
  }

  changeButtonState(): void {
    if(this.dogNameInput.nativeElement.value != '') {
      this.disableButton = "active";
    }
    else{
      this.disableButton = "disabled";
    }
  }
}
