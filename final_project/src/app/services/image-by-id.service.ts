import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Image } from '../interfaces/Image';
import { Observable, pipe, tap, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageByIdService {

  private imagesUrl = 'http://localhost:3000/api/v1/images'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  httpOptionsFile = {
    headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data'})
  }

  constructor(private http: HttpClient) { }



  getImagesById(id:string) {
    return this.http.get<Image>(`${this.imagesUrl}/${id}`).pipe(
      catchError( err => { return of(err)})
    );
  }

  uploadImage(image: Image): Observable<Image> {
    return this.http.post<Image>(this.imagesUrl, image, this.httpOptions);
  }

  deleteImage(id: string) {
    return this.http.delete<Image>(`${this.imagesUrl}/${id}`, this.httpOptions).pipe(
      catchError( err => { return of(err)})
    );
  }

}
