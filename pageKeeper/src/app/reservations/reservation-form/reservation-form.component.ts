import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BookService } from '../../services/books.service';
import { CustomerService } from '../../services/customer.service';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Reservation } from '../reservation';
import { ReservationsService } from '../../services/reservations.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    CommonModule,
    MatInput,
    MatDatepicker,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.scss',
})
export class ReservationFormComponent implements OnInit {
  myForm!: FormGroup;
  books: any[] = [];
  customers: any[] = [];
  isEditMode = false;
  viewOnlyMode = false;

  constructor(
    private bookService: BookService,
    private customerService: CustomerService,
    private reservationService: ReservationsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      customerId: new FormControl(
        { value: '', disabled: this.viewOnlyMode },
        Validators.required
      ),
      bookId: new FormControl(
        { value: '', disabled: this.viewOnlyMode },
        Validators.required
      ),
      returnBy: new FormControl(
        { value: '', disabled: this.viewOnlyMode },
        Validators.required
      ),
    });



    this.bookService.getBooks().subscribe((books: any[]) => {
      this.books = books.filter((book) => book.available);
      console.log('books:', this.books);
    });

    this.customerService.getCustomers().subscribe((customers: any[]) => {
      this.customers = customers;
      console.log('customers', this.customers);
    });
  }

  addReservation(): void {
    if (this.myForm.valid) {
      console.log(this.myForm.value.returnBy);
      const reservationData = {
        ...this.myForm.value,
        returnBy:
          new Date(this.myForm.value.returnBy).toISOString().split('T')[0] +
          'T00:00:00Z',
      };

      this.reservationService.addReservation(reservationData).subscribe({
        next: (response) => {
          console.log('reservation added successfully', response);

          this.myForm.reset();
        },

        error: (error) => {
          console.error('Error adding reservation', error);
        },
      });
    }
  }

  completeReservation(reservationId: string): void {
    this.reservationService.completeReservation(reservationId).subscribe({
      next: () => {
        console.log('Reservation complete');
        this.router.navigate(['/reservations']);
      },
      error: (error) => {
        console.error('Error completing reservation', error);
      },
    });
  }


}
