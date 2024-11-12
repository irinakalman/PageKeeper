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
import { Book } from '../types/books';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatButtonModule,
    RouterLink, MatFormField, MatLabel, MatInput, MatSelectModule, MatFormFieldModule
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
  dataSource: Book[] = [];
  selectedBook: Book | null = null;
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
    this.bookService.getBooks(this.searchTerm, this.sortOrder).subscribe((books: Book[]) => {
      console.log(books);
      this.dataSource = books;
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

  editBook(book: Book): void {
    this.router.navigate(['/books/edit', book._id])
  }

  viewBook(book: Book): void {
    console.log(book)
    console.log(book._id)
    this.router.navigate(['/books/view', book._id])
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

  handleSave(bookData: Book): void {
    if (this.isEditMode && this.selectedBook){
      this.bookService.updateBook(this.selectedBook?._id!, bookData).subscribe({
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
