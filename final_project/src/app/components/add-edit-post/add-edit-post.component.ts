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

  step: string = "name";
  todayDate: Date = new Date();
  today: string = this.todayDate.toISOString().substring(0,10);
  now: string = this.todayDate.getHours() + ':' + "00";
  textNavbar: string = "Publicar";

  @ViewChild('dogNameInput') dogNameInput!: ElementRef;

  
  dogName: string = "";
  dogGender: string = "";
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
    
  continue2(): void {
    this.step = "breed";
    this.textNavbar = "Raza";
  }

  navigate(step: number): void{
    switch(step){
      case 1:
        this.step = "name";
        this.textNavbar = "Nombre";
        this.dogNameInput.nativeElement.value="";
        break;
      case 2:
        this.step = "gender";
        this.textNavbar = "Género";
        this.dogName = this.dogNameInput.nativeElement.value;
        this.disableButton = "disabled";
        break;
      case 3:
        this.step = "breed";
        this.textNavbar = "Raza";
        //RECUPERAR genero de los botones dependiendo cual fue clickeado
        break;
      case 4:
        this.step = "date";
        this.textNavbar = "Fecha";
        this.dogName = this.dogNameInput.nativeElement.value;
        break;
    }
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
