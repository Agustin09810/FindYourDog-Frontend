import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Image } from '../interfaces/Image';
import { map, filter, ignoreElements } from 'rxjs/operators';
import { Observable, pipe, tap, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageByIdService {

  private imagesUrl = 'http://localhost:3000/api/v1/images'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }



  getImagesById(id:string) {
    return this.http.get<Image>(`${this.imagesUrl}/${id}`);
  }

  uploadImage(image: Image): Observable<Image> {
    return this.http.post<Image>(this.imagesUrl, image, this.httpOptions).pipe(
      tap((newImage: Image) => console.log(`added image with id=${newImage.id}`)),
    catchError(this.handleError<Image>('uploadImage'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  };

  deleteImage(id: string) {
    return this.http.delete<Image>(`${this.imagesUrl}/${id}`, this.httpOptions);
  }

}
