import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = 'https://book-api-bx2r.onrender.com/customers';

  constructor(private http: HttpClient) {}

  //method to get the customers
  getCustomers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  //method to post customers
  addCustomer(customer: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, customer);
  }

  //for updating customers
  updateCustomer(id: string, customer: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, customer);
  }
}
