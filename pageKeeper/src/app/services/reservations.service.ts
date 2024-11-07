import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../types/reservation';



@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  private readonly endpoint =  'https://book-api-bx2r.onrender.com/reservations';

  constructor(private http: HttpClient) { }

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.endpoint)
  }

  addReservation(reservation: Reservation): Observable<Reservation> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.post<Reservation>(this.endpoint, reservation, {headers })
  }

  completeReservation(id: string): Observable<Reservation>{
    const url = `${this.endpoint}/${id}/complete`;
    return this.http.post<Reservation>(url, {})
  }
}
