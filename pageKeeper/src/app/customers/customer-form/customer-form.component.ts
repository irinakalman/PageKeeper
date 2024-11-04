import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Customer } from '../customers';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './customer-form.component.html',
})
export class CustomerFormComponent implements OnInit {
  customerForm: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.customerForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
      surname: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    const customerId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!customerId;

    if (customerId) {
      //check if customerId is null
      this.customerService
        .getCustomerById(customerId)
        .subscribe((customer: any) => {
          this.customerForm.patchValue(customer);
        });
    }
  }

  onSubmit() {
    if (this.customerForm.valid) {
      const customerData: Customer = this.customerForm.value;
      if (this.isEditMode) {
        this.customerService
          .updateCustomer(this.route.snapshot.paramMap.get('id')!, customerData)
          .subscribe(() => this.router.navigate(['/customers']));
      } else {
        this.customerService
          .addCustomer(customerData)
          .subscribe(() => this.router.navigate(['/customers']));
      }
    }
  }
}
