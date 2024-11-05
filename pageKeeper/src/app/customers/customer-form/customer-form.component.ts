import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../customers';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'], // Ensure style file is linked
})
export class CustomerFormComponent implements OnInit {
  customerForm!: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      surname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(8)]],
    });

    const customerId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!customerId;

    if (this.isEditMode && customerId) {
      // Edit mode - Load existing customer data
      this.customerService.getCustomerById(customerId).subscribe((customer: Customer) => {
        this.customerForm.patchValue(customer);
      });
    }
  }

  onSubmit() {
    if (this.customerForm.valid) {
      const customerData: Customer = this.customerForm.value;

      if (this.isEditMode) {
        // Update customer
        this.customerService.updateCustomer(this.route.snapshot.paramMap.get('id')!, customerData)
          .subscribe(() => this.router.navigate(['/customers']));
      } else {
        // Add new customer
        this.customerService.addCustomer(customerData)
          .subscribe(() => this.router.navigate(['/customers']));
      }
    }
  }
}
