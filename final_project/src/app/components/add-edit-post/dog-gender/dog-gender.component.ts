import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-dog-gender',
  templateUrl: './dog-gender.component.html',
  styleUrls: ['./dog-gender.component.css']
})
export class DogGenderComponent implements OnInit, AfterViewInit {

  @Input() dogName?: string;
  @Input() dogGender?: string;
  @Input() dataToSend?: string;

  @Output() nextStep = new EventEmitter<string[]>();
  @ViewChild('buttonBoy') buttonBoy!: ElementRef<HTMLButtonElement>;
  @ViewChild('buttonGirl') buttonGirl!: ElementRef<HTMLButtonElement>;

  @Input() mobile?:boolean

  constructor(
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if(this.dogGender){
      if(this.dogGender == this.buttonGirl.nativeElement.value){
        this.buttonGirl.nativeElement.classList.add('active');
      }
      else{
        this.buttonBoy.nativeElement.classList.add('active');
      }
      this.cd.detectChanges();
    }
  }

  nextStepFunction(gender: string): void {
    let toEmit: string[] = [];
    toEmit.push("breed");
    toEmit.push(gender)
    this.nextStep.emit(toEmit);
  }

  lastStepFunction(): void {
    let toEmit: string[] = [];
    toEmit.push("name");
    this.nextStep.emit(toEmit);
  }
  
   changeGender(gender: string){
    this.dataToSend = gender;
   }
  
}
