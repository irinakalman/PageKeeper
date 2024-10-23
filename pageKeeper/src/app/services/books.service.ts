import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'https://book-api-bx2r.onrender.com/books';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}