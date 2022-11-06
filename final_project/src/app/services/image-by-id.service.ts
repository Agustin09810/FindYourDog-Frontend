import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Image } from '../interfaces/Image';
import { map, filter, ignoreElements } from 'rxjs/operators';
import { Observable, pipe, tap, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageByIdService {

  private imagesUrl = 'api/images'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getImages() {
    return this.http.get<Image[]>(this.imagesUrl)
  }

  getImagesById(id:string) {
    console.log(id);
    return this.getImages().pipe(map(imgs => imgs.find(img => img.id === id)));
  }

  uploadImage(image: Image): Observable<Image> {
    return this.http.post<Image>(this.imagesUrl, image, this.httpOptions).pipe(
      tap((newImage: Image) => console.log(`added image with id=${newImage.id}`)),
    catchError(this.handleError<Image>('uploadImage'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  };

  deleteImage(id: string) {
    return this.http.delete<Image>(`${this.imagesUrl}/${id}`, this.httpOptions);
  }

}
