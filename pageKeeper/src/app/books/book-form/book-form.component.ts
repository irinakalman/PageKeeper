import {
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BookService } from '../../services/books.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule, RouterLink
  ],
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
  isEditMode = false;
  isViewMode = false;
  bookId: string | null = null;
  showSuccessMessage = false;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.bookForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
      year: [
        '',
        [Validators.required, Validators.min(1900), Validators.max(2024)],
      ],
      type: ['', Validators.required],
      author: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
      createdOn: [{value: '', disabled: true}]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.bookId = params.get('id');
      this.isEditMode = this.route.snapshot.routeConfig?.path === 'books/edit/:id';
      this.isViewMode = this.route.snapshot.routeConfig?.path === 'books/view/:id';

      if (this.isEditMode || this.isViewMode) {
        this.loadBookData();
      }

      if (this.isViewMode) {
        this.bookForm.disable(); // Disable the form in view mode
      }
    });
  }

  loadBookData(): void {
    if (this.bookId) {
      this.bookService.getBookById(this.bookId).subscribe((bookData) => {
        if (bookData){
          this.bookForm.patchValue({
            name: bookData.name,
            year: bookData.year,
            type: bookData.type,
            author: bookData.author,
            createdOn: bookData.createdOn
          })
        }
      });
    }
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const bookData = {
        ...this.bookForm.value,
        createdOn: this.isEditMode ? this.bookForm.value.createdOn: new Date().toISOString() ,
      };

      if (this.isEditMode && this.bookId) {
        this.bookService.updateBook(this.bookId, bookData).subscribe({
          next: () => {
            console.log('Book updated successfully');
            this.router.navigate(['/books']);
          },
          error: (error) => console.error('Error updating book:', error),
        });
      } else {
        this.bookService.addBook(bookData).subscribe({
          next: () => {
            console.log('Book added successfully');
            this.showSuccessMessage = true;
            this.bookForm.reset();
            Object.keys(this.bookForm.controls).forEach(key => {
              this.bookForm.get(key)?.setErrors(null);
              this.bookForm.get(key)?.markAsPristine();
              this.bookForm.get(key)?.markAsUntouched();
            });

            setTimeout(() => {
              this.showSuccessMessage = false;
            }, 10000)
          },
          error: (error) => console.error('Error adding a book:', error),
        });
      }
    }
  }
}
