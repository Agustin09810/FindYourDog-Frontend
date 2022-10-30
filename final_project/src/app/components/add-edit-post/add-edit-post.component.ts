import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import { DeviceDetectorService } from 'ngx-device-detector';

import {BreedService} from '../../services/breed.service';
import {Breed} from '../../interfaces/Breed';

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

  dogName: string = "";
  otherNames: string[] = [];
  dogGender: string = "";
  dogBreed: string = "";
  breeds: Breed[] = [];
  lastSeenDate: string = "";
  lastSeenHour: string = "";
  
  additionalInfo: string = "";

  disableButton: string = "disabled";

  constructor(
    private deviceService: DeviceDetectorService,
    private route: ActivatedRoute,
    private location: Location,
    private breedService: BreedService
  ) { }

  isMobile = this.deviceService.isMobile();
  isTablet = this.deviceService.isTablet();
  isDesktop = this.deviceService.isDesktop();
  
  ngOnInit(): void {
    this.getBreeds();
  }
    

  navigate(step: number, auxText?: string): void{
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
          this.step = "photos";
          this.textNavbar = "Fotos";
          //RECUPERAR FECHA Y HORA DE DESAPARICION;
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

  verifyDate(date: string, hour:string): boolean{
    let dateAux = new Date(date);
    let today = new Date();
    let a = dateAux.getDate();
    let b = today.getDate();
    if(dateAux.getFullYear() > today.getFullYear()){
      this.disableButton = "disabled";
      return false;
    }
    else{
      if(dateAux.getMonth() > today.getMonth()){
        this.disableButton = "disabled";
        return false;
      }
      else{
        if(dateAux.getDate() > today.getDate()){
          this.disableButton = "disabled";
          return false;
        }
        else{
          if(dateAux.getDate()+1 == today.getDate()){
            if(parseInt(hour.substring(0,2)) > today.getHours()){
              this.disableButton = "disabled";
              return false;
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
    }
    this.disableButton = "active";
    return true;
  }


  searchBreed(event: any){
    this.breedService.getBreedByName(event.target.value).subscribe(breeds => this.breeds = breeds);
  }
}
