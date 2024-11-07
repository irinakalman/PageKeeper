import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { BookService } from '../services/books.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {  Router, RouterLink } from '@angular/router';
import { MatFormField, MatFormFieldModule, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatButtonModule,
    RouterLink, MatFormField, MatLabel, MatInput, MatSelectModule, MatFormFieldModule, MatIconModule
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent implements OnInit {
  displayedColumns: string[] = [
    'bookName',
    'bookYear',
    'bookType',
    'bookAuthor',
    'createdOn',
    'actions',
  ];
  dataSource: any[] = [];
  selectedBook: any = null;
  isViewMode = false;
  isEditMode = false;
  showForm = false;
  searchTerm: string = '';
  sortOrder: string = 'asc';

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks(this.searchTerm, this.sortOrder).subscribe((books: any[]) => {
      console.log(books);
      this.dataSource = books.map((book) => ({
        bookName: book.name,
        bookYear: book.year,
        bookType: book.type,
        bookAuthor: book.author,
        createdOn: book.createdOn,
        bookId: book._id,
      }));
      //console.log(books);
    });
  }

  onSearchChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm = inputElement.value;
    this.loadBooks();
}

  onSortChange(sort: string): void {
    this.sortOrder = sort;
    this.loadBooks();
  }

  // addBook(): void {
  //  this.router.navigate(['/books/new'])
  // }

  editBook(book: any): void {
    this.router.navigate(['/books/edit', book.bookId])
  }

  viewBook(book: any): void {
    console.log(book)
    console.log(book.bookId)
    this.router.navigate(['/books/view', book.bookId])
  }

  deleteBook(bookId: string): void{
    if (confirm('Are you sure you want to delete the book?')){
      this.bookService.deleteBook(bookId).subscribe({
        next: () => {
          console.log('Book deleted');
          this.loadBooks();
        },
        error: (error) => console.error('error deleting the book', error)
      })
    }
  }

  handleSave(bookData: any): void {
    if (this.isEditMode && this.selectedBook){
      this.bookService.updateBook(this.selectedBook.id, bookData).subscribe({
        next: () => {
          console.log('book updated successfully');
          this.loadBooks();
          this.closeForm();
        },
        error: (error) => console.error('Error updating book', error)
      })
    } else {
      this.bookService.addBook(bookData).subscribe({
        next: (newBook) => {
          console.log('Book added', newBook);
          this.dataSource = [...this.dataSource, newBook];
          this.closeForm()
        },
        error: (error) => console.error('Error adding book:', error)
      })
    }
  }

  closeForm(): void {
    this.showForm = false;
    this.selectedBook = null;
    this.isEditMode = false;
    this.isViewMode = false;
  }
}
