import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { BookService } from '../services/books.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent implements OnInit {
  displayedColumns: string[] = ['bookName', 'bookYear', 'bookType', 'bookAuthor', 'createdOn'];
  dataSource: any[] = [];

  constructor(private bookService: BookService){}

  ngOnInit(): void{
    this.bookService.getBooks().subscribe((books: any[]) => {
      console.log(books);
      this.dataSource = books.map(book => ({
        bookName: book.name,
        bookYear: book.year,
        bookType: book.type,
        bookAuthor: book.author,
        createdOn: book.createdOn
      }));
      console.log(books);
    })
  }
}
