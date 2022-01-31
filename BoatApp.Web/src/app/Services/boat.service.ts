import { Injectable } from '@angular/core';
import { Boat } from '../Models/Boat';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoatService {

  constructor(private http: HttpClient) { }

  private optionRequete = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*'
    })
  };

  getBoats(): Observable<Boat[]>{
    return this.http.get<Boat[]>(`${environment.apiUrl}/boat`,this.optionRequete);
  }

  getBoat(id: string): Observable<Boat>{
    return this.http.get<Boat>(`${environment.apiUrl}/boat/${id}`, this.optionRequete);
  }

  postBoat(boat: Boat) : Observable<any> {
    return this.http.post(`${environment.apiUrl}/boat`, boat, this.optionRequete);
  }

  putBoat(boat: Boat): Observable<any>{
    return this.http.put(`${environment.apiUrl}/boat`, boat, this.optionRequete);
  }
  
  deleteBoat(id: string): Observable<any>{
    return this.http.delete(`${environment.apiUrl}/boat/${id}`, this.optionRequete);
  }
}
