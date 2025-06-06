import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Breed } from '../interfaces/Breed';
import { Observable, map, of, catchError } from 'rxjs';
import { BACKEND_PROD } from './constants';

@Injectable({
  providedIn: 'root'
})

export class BreedService {
  private breedsUrl = BACKEND_PROD + '/api/v1/breeds';

  constructor(private http: HttpClient) { }

  getBreeds(): Observable<Breed[]|any> {
    return this.http.get<Breed[]>(this.breedsUrl).pipe(catchError( err => {
      return of(err);
    }));
  }

  getBreedById(id: string): Observable<Breed|undefined|any> {
    return this.http.get<Breed|undefined>(`${this.breedsUrl}/${id}`).pipe(catchError( err => {
      return of(err);
      }));
  }

  getBreedByName(name: string): Observable<Breed[]> {
    return this.http.get<Breed[]>(`${this.breedsUrl}?name=${name}`);
  }

}
