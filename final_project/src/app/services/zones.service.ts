import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ZonesService {

  private zonesUrl = 'api/zones'
  constructor(private http:HttpClient) { }

  getZones() {
    return this.http.get<Zone[]>(this.zonesUrl);
  }
}
