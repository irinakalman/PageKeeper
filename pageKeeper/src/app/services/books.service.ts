import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../types/books';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'https://book-api-bx2r.onrender.com/books';

  constructor(private http: HttpClient) {}

  getBooks(search: string = '', sort: string = 'asc'): Observable<Book[]> {
    let params = new HttpParams();
    if (search) {
      params = params.set('search', search);
    }

    if (sort) {
      params = params.set('sort', sort);
    }
    return this.http.get<Book[]>(this.apiUrl, { params });
  }

  getBookById(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  updateBook(id: string, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${id}`, book);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
  }

  deleteBook(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
