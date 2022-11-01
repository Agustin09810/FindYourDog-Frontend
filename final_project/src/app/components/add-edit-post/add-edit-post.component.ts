import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import { DeviceDetectorService } from 'ngx-device-detector';

import {BreedService} from '../../services/breed.service';
import {Breed} from '../../interfaces/Breed';

import {Zone} from '../../interfaces/Zone';
import {ZonesService} from '../../services/zones.service';

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

  @ViewChild('dogNameInput') dogNameInput!: ElementRef;
  @ViewChild('another1') another1Input?: ElementRef;
  @ViewChild('another2') another2Input?: ElementRef;
  @ViewChild('datePicker') datePicker!: ElementRef;
  @ViewChild('timePicker') timePicker!: ElementRef;
  @ViewChild('locationPicker') locationPicker!: ElementRef;

  dogName?: string;
  otherNames?: string[];
  dogGender?: string;
  dogBreed?: string;
  breeds: Breed[] = [];
  lastSeenDate?: string;
  lastSeenHour?: string;
  ubiDetails?: string;


  zones: Zone[] = [];

  additionalInfo: string = "";

  @Input() counterOfChars: number = 0;

  disableButton: string = "disabled";

  constructor(
    private deviceService: DeviceDetectorService,
    private route: ActivatedRoute,
    private location: Location,
    private breedService: BreedService,
    private zonesService: ZonesService
  ) { }

  isMobile = this.deviceService.isMobile();
  isTablet = this.deviceService.isTablet();
  isDesktop = this.deviceService.isDesktop();
  
  ngOnInit(): void {
    this.getBreeds();
    this.getZones();
  }
    

  navigate(step: number, auxText?: string, auxText2?: string, auxText3?: string): void{
    switch(step){
      case 1:
        this.step = "name";
        this.textNavbar = "Nombre";
        this.dogNameInput.nativeElement.value = this.dogName;
        if(this.otherNames != undefined)
        if(this.otherNames.length > 0)(
          this.otherNames = []
        )
        break;
      case 2:
        this.step = "gender";
        this.textNavbar = "Género";
        this.dogName = this.dogNameInput.nativeElement.value!;
        if(this.otherNames != undefined)
        if(this.another1Input && this.another1Input.nativeElement.value != ''){
          this.otherNames.push(this.another1Input.nativeElement.value);
          if(this.another2Input && this.another2Input.nativeElement.value != ''){
            this.otherNames.push(this.another2Input.nativeElement.value);
          }
        }
        break;
      case 3:
        this.step = "breed";
        this.textNavbar = "Raza";
        this.dogGender = auxText!;
        break;
      case 4:
        this.step = "date";
        this.textNavbar = "Fecha";
        if(auxText){
          this.dogBreed = auxText;
        }
        else{
          this.dogBreed = "Desconocida";
        }
        debugger;
        if(this.lastSeenDate != undefined){
          this.datePicker.nativeElement.value = this.lastSeenDate;
          this.timePicker.nativeElement.value = this.lastSeenHour;
          this.locationPicker.nativeElement.value = this.ubiDetails;
        }
        break;
        case 5:
          this.lastSeenDate = auxText!;
          this.lastSeenHour = auxText2!;
          this.ubiDetails = auxText3!;
          this.step = "photos";
          this.textNavbar = "Fotos";
    }
  }

  publish(): void{
    
  }

  changeButtonState(): void {
    if(this.dogNameInput.nativeElement.value != '') {
      this.disableButton = "active";
    }
    else{
      this.disableButton = "disabled";
    }
  }

  getBreeds() : void{
    this.breedService.getBreeds().subscribe(breeds => this.breeds = breeds);
  }

  getBreedById(id: string): void{
    this.breedService.getBreedById(id).subscribe(breed => {
      if(breed){
        this.dogBreed = breed.name;
      }
    });
  }

  getZones(): void{
    this.zonesService.getZones().subscribe(zones => this.zones = zones);
  }

  verifyDate(date: string, hour:string, selectedIndex:number): boolean{
    let dateAux = new Date(date);
    let today = new Date();
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

  verifyPhoto(): void{

  }

  countCharacters(event: any){
    this.counterOfChars = event.length;
  }


  searchBreed(event: any){
    this.breedService.getBreedByName(event.target.value).subscribe(breeds => this.breeds = breeds);
  }
}
