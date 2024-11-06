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

  getBookById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`)
  }

  updateBook(id: string, book: any): Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/${id}`, book);
  }

  addBook(book: any): Observable<any>{
    return this.http.post<any>(this.apiUrl, book);
  }

  deleteBook(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
