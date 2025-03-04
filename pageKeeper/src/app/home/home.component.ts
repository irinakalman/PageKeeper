import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { BookService } from '../services/books.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Book } from '../types/books';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  availableBooks: Book[] = [];
  displayedColumns: string[] = [
    'name',
    'year',
    'type',
    'author',
    'createdOn',
    'actions',
  ]; // Στήλες που θα εμφανίζονται (actions is for the reserve it now button)

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((books: Book[]) => {
      //fiter available books
      console.log(books)
      this.availableBooks = books.filter(
        (book: Book) => book.available === true
      );
    });
  }
  reserveBook(bookId: string): void {
    this.router.navigate(['/new-reservation', bookId]);
  }
}
