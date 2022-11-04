import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import { DeviceDetectorService } from 'ngx-device-detector';

import {BreedService} from '../../services/breed.service';
import {Breed} from '../../interfaces/Breed';

import {Zone} from '../../interfaces/Zone';
import {ZonesService} from '../../services/zones.service';

import {Post} from '../../interfaces/Post';
import {PostsService} from '../../services/posts.service';

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
  @ViewChild('another1') another1Input?: ElementRef;
  @ViewChild('another2') another2Input?: ElementRef;

  //Elements from STEP 4
  @ViewChild('datePicker') datePicker!: ElementRef;
  @ViewChild('timePicker') timePicker!: ElementRef;
  @ViewChild('locationComboBox') locationPicker!: ElementRef;
  @ViewChild('ubiDetailsText') ubiDetailsInput!: ElementRef;
  

  dogName?: string;
  otherNames: string[] = [];
  dogGender?: string;
  dogBreed?: string;
  breeds: Breed[] = [];
  lastSeenDate?: string;
  lastSeenHour?: string;
  lostZone?: string;
  ubiDetails: string = "";
  photos: string[] = [];
  

  zones: Zone[] = [];

  additionalInfo: string = "";

  @Input() counterOfChars: number = 0;

  disableButton: string = "disabled";

  constructor(
    private deviceService: DeviceDetectorService,
    private route: ActivatedRoute,
    private location: Location,
    private breedService: BreedService,
    private zonesService: ZonesService,
    private postService: PostsService
  ) { }

  isMobile = this.deviceService.isMobile();
  isTablet = this.deviceService.isTablet();
  isDesktop = this.deviceService.isDesktop();
  
  ngOnInit(): void {
    this.getBreeds();
    this.getZones();
  }
  navigateAux(data: string[]){
    this.step=data[0];
    switch(this.step){
      case "name":
        this.textNavbar = "Nombre";
        break;
      case "gender":
        this.textNavbar = "Género";
        if(data[1]){
        this.dogName = data[1];
        }
        if(data[2]){
          let aux: string[] = [data[2]];
          if(data[3]){
            aux.push(data[3]);
          }
          this.otherNames = aux;
        }
        break;
      case "breed":
        this.textNavbar = "Raza";
        if(data[1]){
        this.dogGender = data[1];
        }
        break;
      case "date":
        this.textNavbar = "Fecha";
        this.dogBreed = data[1];
        break;
      case "photos":
        this.textNavbar = "Fotos";
        if(data[1]){
          this.lastSeenDate = data[1];
          this.lastSeenHour = data[2];
          this.lostZone = data[3];
          if(data[4]){
            this.ubiDetails = data[4];
          }
        }
        break;
    }
  }

  navigate(step: number, auxText?: string, auxText2?: string, auxText3?: string, auxText4?: string): void{
    switch(step){
      case 1:
        this.step = "name";
        this.textNavbar = "Nombre";
        break;
      case 2:
        this.step = "gender";
        this.textNavbar = "Género";
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
        break;
        case 5:
          this.lastSeenDate = auxText!;
          this.lastSeenHour = auxText2!;
          this.ubiDetails = auxText3!;
          this.lostZone = auxText4!;
          this.step = "photos";
          this.textNavbar = "Fotos";
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

  countCharacters(event: any){
    this.counterOfChars = event.length;
  }

  


}
