import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CustomerService } from '../services/customer.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms'; // add this for ngModel
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

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
    MatFormFieldModule,
    MatInputModule,
    FormsModule, // add this for ngModel
    MatSelectModule, //needed for sorting
    MatOptionModule, //needed for sorting
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
  filteredCustomers: any[] = []; //define filteredCustomers
  searchTerm: string = ''; //define searchTerm
  sortOrder: string = 'asc'; //sort order

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
      this.filterCustomers();
    });
  }

  filterCustomers() {
    const lowerCaseTerm = this.searchTerm.toLowerCase();
    this.filteredCustomers = this.customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(lowerCaseTerm) ||
        customer.email.toLowerCase().includes(lowerCaseTerm)
    );
    //sorting
    this.filteredCustomers.sort((a, b) => {
      const comparison = a.name.localeCompare(b.name); // Compare names alphabetically
      return this.sortOrder === 'asc' ? comparison : -comparison; // Ascending or descending
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
