import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Breed } from '../interfaces/Breed';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BreedService {
  private breedsUrl = 'http://localhost:3000/api/v1/breeds';

  constructor(private http: HttpClient) { }

  getBreeds(): Observable<Breed[]> {
    return this.http.get<Breed[]>(this.breedsUrl);
  }

  getBreedById(id: string): Observable<Breed|undefined> {
    return this.http.get<Breed|undefined>(`${this.breedsUrl}/${id}`);
  }


    //FALTA IMPLEMENTAR EN BACKEND

  getBreedByName(name: string): Observable<Breed[]> {
    return this.http.get<Breed[]>(`${this.breedsUrl}?name=${name}`);
   /*  let filteredBreeds = new Array<Breed>();
    this.http.get<Breed[]>(this.breedsUrl).subscribe(breeds => {
      breeds.forEach(breed => {
        if (breed.name.toLowerCase().includes(name.toLowerCase())) {
          filteredBreeds.push(breed);
        }
      });
    });
    return of(filteredBreeds); */
  }

}
