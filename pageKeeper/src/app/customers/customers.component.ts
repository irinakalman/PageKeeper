import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CustomerService } from '../services/customer.service';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; //for forms
import { CustomerFormComponent } from '../customer-form/customer-form.component';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
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
    public dialog: MatDialog
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
    const dialogRef = this.dialog.open(CustomerFormComponent, {
      width: '400px',
      data: { customer: null },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadCustomers();
      }
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
