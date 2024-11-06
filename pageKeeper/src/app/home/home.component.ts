import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { BookService } from '../services/books.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, CommonModule, MatTableModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  availableBooks: any[] = [];
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
    this.bookService.getBooks().subscribe((books: any) => {
      //fiter available books
      this.availableBooks = books.filter(
        (book: any) => book.available === true
      );
    });
  }
  reserveBook(bookId: string): void {
    this.router.navigate(['/new-reservation', bookId]);
  }
}
