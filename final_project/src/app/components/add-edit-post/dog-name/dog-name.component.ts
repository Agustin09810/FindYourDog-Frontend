import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter, ChangeDetectorRef, AfterViewInit} from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import {  } from 'src/app/interfaces/Post';

@Component({
  selector: 'app-dog-name',
  templateUrl: './dog-name.component.html',
  styleUrls: ['./dog-name.component.css']
})
export class DogNameComponent implements OnInit, AfterViewInit {

  isMobile = this.deviceService.isMobile();
  isTablet = this.deviceService.isTablet();
  isDesktop = this.deviceService.isDesktop();

  @Input() dogName?: string;
  @Input() otherNames: string[] = [];
  @Output() nextStep = new EventEmitter<string[]>();


  @ViewChild('dogNameInput') dogNameInput!: ElementRef;
  @ViewChild('nickName1') another1Input?: ElementRef;
  @ViewChild('nickName2') another2Input?: ElementRef;
  @ViewChild('checkYes') checkYes!: ElementRef<HTMLInputElement>;
  @ViewChild('checkYes') another1Button!: ElementRef<HTMLButtonElement>;
  
  @Input() checked: boolean = false;

  disableButton: string = "disabled";

  @Input() mobile?:boolean

  constructor(private deviceService: DeviceDetectorService,
    private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if(this.dogName){
      this.disableButton = 'active';
    }
    if(this.otherNames[0] != undefined){
      this.checked = true;
      this.checkYes.nativeElement.checked = true;
    }
    this.cd.detectChanges();
  }
  
  changeButtonState(): void {
    if(this.dogNameInput.nativeElement.value != '') {
      this.disableButton = "active";
    }
    else{
      this.disableButton = "disabled";
    }
  }

  nextStepFunction(): void {
    let toEmit: string[] = [];
    toEmit.push("gender");
    toEmit.push(this.dogNameInput.nativeElement.value);
    if(this.another1Input && this.another1Input.nativeElement.value != ''){
      toEmit.push(this.another1Input.nativeElement.value);
    }
    if(this.another2Input && this.another2Input.nativeElement.value != ''){
      toEmit.push(this.another2Input.nativeElement.value);
    }
    this.nextStep.emit(toEmit);
  }




}
