import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { BookService } from '../services/books.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent implements OnInit {
  books: any[] = [];

  constructor(private bookService: BookService){}

  ngOnInit(): void{
    this.bookService.getBooks().subscribe((books: any) => {
      this.books = books;
      console.log(books);

      // this.reservations.forEach(reservation => {
      //   console.log(reservation)
      // })
    })
  }
}
