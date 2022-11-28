import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import {BreedService} from '../../../services/breed.service';
import {Breed} from '../../../interfaces/Breed';

@Component({
  selector: 'app-dog-breed',
  templateUrl: './dog-breed.component.html',
  styleUrls: ['./dog-breed.component.css']
})
export class DogBreedComponent implements OnInit {

  @Output() nextStep = new EventEmitter<string[]>();
  @Input() dogName?: string;
  @Input() dogBreed?: string;
  breeds: Breed[] = [];

  constructor(
    private breedService: BreedService
  ) { }

  ngOnInit(): void {
    this.getBreeds()
  }

  getBreeds() : void{
    this.breedService.getBreeds().subscribe(breeds => {
      if(breeds!.status == 404){
        console.error(`Error 404, BREEDS NOT FOUND`);
        this.breeds = [];
        return;
      }
      this.breeds = breeds
    });
  }

  getBreedById(id: string): void{
    this.breedService.getBreedById(id).subscribe(breed => {
      if(breed!.status == 404){
        console.error(`Error 404, BREED ${id} NOT FOUND`);
        return;
      }
      if(breed){
        this.dogBreed = breed.name;
      }
    });
  }

  searchBreed(event: any){
    this.breedService.getBreedByName(event.target.value).subscribe(breeds => this.breeds = breeds);
  }

  nextStepFunction(breed: string): void {
    let toEmit: string[] = [];
    toEmit.push("date");
    toEmit.push(breed);
    this.nextStep.emit(toEmit);
  }

  lastStepFunction(): void {
    let toEmit: string[] = [];
    toEmit.push("gender");
    this.nextStep.emit(toEmit);
  } 

}
