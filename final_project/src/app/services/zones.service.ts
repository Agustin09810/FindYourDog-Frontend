import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Zone } from '../interfaces/Zone';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZonesService {

  private zonesUrl = 'api/zones'
  constructor(private http:HttpClient) { }

  getZones() {
    return this.http.get<Zone[]>(this.zonesUrl);
  }

  getZone(id: string): Observable<Zone>{
    const url = `${this.zonesUrl}/${id}`;
    return this.http.get<Zone>(url);
  }



}
