import { observable } from './../../../node_modules/rxjs/src/internal/symbol/observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../reservations/reservation';



@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  private readonly endpoint =  'https://book-api-bx2r.onrender.com/reservations';

  constructor(private http: HttpClient) { }

  getReservations(): Observable<any> {
    return this.http.get(this.endpoint)
  }

  addReservation(reservation: Reservation): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.post(this.endpoint, reservation, {headers })
  }

  completeReservation(id: string): Observable<any>{
    const url = `${this.endpoint}/${id}/complete`;
    return this.http.post(url, {})
  }
}
