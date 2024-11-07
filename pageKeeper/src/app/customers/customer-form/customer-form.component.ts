import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
    RouterLink,
  ],
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent implements OnInit {
  customerForm!: FormGroup;
  isEditMode = false;
  isViewMode = false;
  showSuccessMessage = false;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  viewOnlyMode: boolean = false; //for view button

  ngOnInit(): void {
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

    const customerId = this.route.snapshot.paramMap.get('id');
    this.isViewMode = this.route.snapshot.url.some(segment => segment.path === 'view');
    this.isEditMode = !this.isViewMode && !!customerId;
    this.viewOnlyMode = this.isViewMode;
    console.log('isViewMode:', this.isViewMode);
    console.log('isEditMode:', this.isEditMode);

    if (customerId) {
      //Load existing customer data if we are in edit or view mode
      this.customerService
        .getCustomerById(customerId)
        .subscribe((customer: Customer) => {
          this.customerForm.patchValue(customer);
          if (this.viewOnlyMode) {
            this.customerForm.disable(); //disable all fields for view mode
          }
        });
    }
  }



  onSubmit() {
    if (this.customerForm.valid) {
      const customerData: Customer = this.customerForm.value;

      if (this.isEditMode) {
        // Update customer
        this.customerService
          .updateCustomer(this.route.snapshot.paramMap.get('id')!, customerData)
          .subscribe(() => this.router.navigate(['/customers']));
      } else {
        // Add new customer
        this.customerService
          .addCustomer(customerData)
          .subscribe({
            next: () => {
              console.log('Customer added successfully with test data');
              this.showSuccessMessage = true;
              this.customerForm.reset();
              Object.keys(this.customerForm.controls).forEach(key => {
                this.customerForm.get(key)?.setErrors(null);
                this.customerForm.get(key)?.markAsPristine();
                this.customerForm.get(key)?.markAsUntouched();
              });

              setTimeout(() => {
                this.showSuccessMessage = false;
              }, 10000)
            },
            error: (error) => console.error('Error with test payload:', error)
          });
      }
    }
  }
}
