import { BookFormComponent } from './books/book-form/book-form.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import { CustomersComponent } from './customers/customers.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { ReservationFormComponent } from './reservations/reservation-form/reservation-form.component';
import { CustomerFormComponent } from './customers/customer-form/customer-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'books', component: BooksComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'reservations', component: ReservationsComponent },
  { path: 'new-reservation', component: ReservationFormComponent},
  { path: 'new-book', component: BookFormComponent },
  { path: 'books/edit/:id', component: BookFormComponent },
  { path: 'books/view/:id', component: BookFormComponent },

];
