import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Breed } from '../interfaces/Breed';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreedService {
  private breedsUrl = 'api/breeds';
  constructor(private http: HttpClient) { }

  getBreeds(): Observable<Breed[]> {
    return this.http.get<Breed[]>(this.breedsUrl);
  }

  getBreedById(id: string): Observable<Breed|undefined> {
    return this.getBreeds().pipe(map(breeds => breeds.find(breed => breed.id === id)));
  }

  getBreedByName(name: string): Observable<Breed[]> {
    let filteredBreeds = new Array<Breed>();
    this.http.get<Breed[]>(this.breedsUrl).subscribe(breeds => {
      breeds.forEach(breed => {
        if (breed.name.toLowerCase().includes(name.toLowerCase())) {
          filteredBreeds.push(breed);
        }
      });
    });
    return of(filteredBreeds);
  }

}
