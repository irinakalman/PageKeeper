import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { BookService } from '../services/books.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, CommonModule, MatTableModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  availableBooks: any[] = [];
  displayedColumns: string[] = ['name', 'year', 'type', 'author', 'createdOn']; // Στήλες που θα εμφανίζονται

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((books: any) => {
      //fiter available books
      this.availableBooks = books.filter(
        (book: any) => book.available === true
      );
    });
  }
}
