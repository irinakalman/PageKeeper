import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CustomerService } from '../services/customer.service';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [HeaderComponent, CommonModule, MatTableModule, MatButtonModule],
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

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe((data: any) => {
      this.customers = data;
    });
  }

  viewCustomer(customer: any) {
    console.log('Viewing customer:', customer);
  }

  editCustomer(customer: any) {
    console.log('Editing customer:', customer);
  }

  deleteCustomer(customer: any) {
    console.log('Deleting customer:', customer);
  }
}
