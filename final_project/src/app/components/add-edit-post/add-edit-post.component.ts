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
  dogDescription: string = "";
  photos: string[] = [];

  constructor(
    private deviceService: DeviceDetectorService,
    private route: ActivatedRoute
  ) { }

  isMobile = this.deviceService.isMobile();
  isTablet = this.deviceService.isTablet();
  isDesktop = this.deviceService.isDesktop();
  
  ngOnInit(): void {
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
        console.log(new Date(this.lastSeenDate + ' ' + this.lastSeenHour));
        break;
    }
  }
      
  randomID(length: number): string {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }

    publish(){
      let post: Post = { id: this.randomID(15), user:'admin', dogName: this.dogBreed!, dogNickNames: this.otherNames, dogGender: this.dogGender!,
       dogBreed: this.dogBreed!, lostOn: new Date(this.lastSeenDate + ' ' + this.lastSeenHour), lostZone: this.lostZone!, lostDescription: this.ubiDetails, 
       dogDescription: this.dogDescription, photos: this.photos};
      }
      
}
