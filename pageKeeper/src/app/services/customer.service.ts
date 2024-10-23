import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = 'https://book-api-bx2r.onrender.com/customers';
  constructor(private http: HttpClient) {}
  getCustomers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
