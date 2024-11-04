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
  { path: 'new-reservation', component: ReservationFormComponent },
  { path: 'new-customer', component: CustomerFormComponent },
  { path: 'customers/view/:id', component: CustomerFormComponent },
  { path: 'customers/edit/:id', component: CustomerFormComponent },
];
