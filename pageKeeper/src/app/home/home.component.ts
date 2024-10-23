import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { BookService } from '../services/books.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  availableBooks: any[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((books: any) => {
      this.availableBooks = books.filter(
        (book: any) => book.available === true
      );
    });
  }
}
