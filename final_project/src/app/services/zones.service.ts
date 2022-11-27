import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Zone } from '../interfaces/Zone';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZonesService {

  private zonesUrl = 'http://localhost:3000/api/v1/zones'
  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getZones() {
    return this.http.get<Zone[]>(this.zonesUrl).pipe(catchError(err => {
      console.log(err);
      return of(err);
    }));
  }

  getZone(id: string): Observable<Zone|any>{
    const url = `${this.zonesUrl}/${id}`;
    return this.http.get<Zone>(url).pipe(catchError(err => {
      if(err.status == 404){
        console.log('Error 404: Zone not found');
        
      }
      return of(err);
    }
    ));
  }

  updateZone(zone: Zone): Observable<Zone>{
    const url = `${this.zonesUrl}/${zone.id}`;
    return this.http.put<Zone>(url, zone, this.httpOptions);
  }



}
