import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CustomerService } from '../services/customer.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { CustomerFormComponent } from './customer-form/customer-form.component';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    MatTableModule,
    MatButtonModule,
    CustomerFormComponent,
    RouterLink,
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'surname',
    'email',
    'phoneNumber',
    'actions',
  ];
  customers: any[] = [];

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService.getCustomers().subscribe((data: any) => {
      this.customers = data;
    });
  }

  addCustomer() {
    this.router.navigate(['/new-customer']);
  }

  viewCustomer(customer: any) {
    this.router.navigate(['/customers/view', customer._id]);
  }

  editCustomer(customer: any) {
    this.router.navigate(['/customers/edit', customer._id]);
  }

  deleteCustomer(customer: any) {
    if (
      confirm(
        `Are you sure you want to delete ${customer.name} ${customer.surname}?`
      )
    ) {
      this.customerService.deleteCustomer(customer._id).subscribe(() => {
        this.loadCustomers();
      });
    }
  }
}
