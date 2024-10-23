import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CustomerService } from '../services/customer.service';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent implements OnInit {
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
