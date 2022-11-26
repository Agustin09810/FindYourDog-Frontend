import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter, ChangeDetectorRef, AfterViewInit} from '@angular/core';
import {  } from 'src/app/interfaces/Post';

@Component({
  selector: 'app-dog-name',
  templateUrl: './dog-name.component.html',
  styleUrls: ['./dog-name.component.css']
})
export class DogNameComponent implements OnInit, AfterViewInit {

  @Input() dogName?: string;
  @Input() otherNames?: string[];
  @Output() nextStep = new EventEmitter<string[]>();
  editBoolean: boolean = false;
  @Input() 
  get editBool(): boolean {return this.editBoolean}
  set editBool(value: boolean) {
    this.editBoolean = value;
    if(value){
      this.disableButton = "active";
    }
    else{
      this.disableButton = "disabled";
    }
  }

  @ViewChild('dogNameInput') dogNameInput!: ElementRef<HTMLInputElement>;
  @ViewChild('nickName1') another1Input?: ElementRef;
  @ViewChild('nickName2') another2Input?: ElementRef;
  @ViewChild('checkYes') checkYes!: ElementRef<HTMLInputElement>;
  @ViewChild('checkYes') another1Button!: ElementRef<HTMLButtonElement>;
  
  @Input() checked: boolean = false;
  validName?: string;

  disableButton: string = "disabled";

  constructor(
    private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if(this.dogName){
      console.log(this.dogName);
      this.disableButton = 'active';
    }
    if(this.otherNames){
      if(this.otherNames[0] != undefined){
        this.checked = true;
        this.checkYes.nativeElement.checked = true;
      }
    }
    this.cd.detectChanges();
  }

  checkValidName(): void {
    if(this.dogNameInput.nativeElement.value.trim().length == 0){
      this.validName = "invalid";
    }
    else{
      this.validName = "valid";
    }
  }
  
  changeButtonState(): void {
    if(this.dogNameInput.nativeElement.value.trim().length != 0) {
      this.disableButton = "active";
    }
    else{
      this.disableButton = "disabled";
    }
  }

  nextStepFunction(): void {
    let toEmit: string[] = [];
    toEmit.push("gender");
    toEmit.push(this.dogNameInput.nativeElement.value.trim());
    if(this.another1Input && this.another1Input.nativeElement.value != ''){
      toEmit.push(this.another1Input.nativeElement.value.trim());
    }
    if(this.another2Input && this.another2Input.nativeElement.value != ''){
      toEmit.push(this.another2Input.nativeElement.value.trim());
    }
    this.nextStep.emit(toEmit);
  }




}
