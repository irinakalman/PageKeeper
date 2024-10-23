import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  private readonly endpoint =  'https://book-api-bx2r.onrender.com/reservations';

  constructor(private http: HttpClient) { }

  getReservations(): Observable<any> {
    return this.http.get(this.endpoint)
  }
}
