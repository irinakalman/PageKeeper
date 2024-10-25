import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerService } from '../services/customer.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
})
export class CustomerFormComponent {
  customerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    public dialogRef: MatDialogRef<CustomerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.customerForm = this.fb.group({
      name: [
        data.customer ? data.customer.name : '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
      surname: [
        data.customer ? data.customer.surname : '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
      email: [
        data.customer ? data.customer.email : '',
        [Validators.required, Validators.email],
      ],
      phoneNumber: [
        data.customer ? data.customer.phoneNumber : '',
        [Validators.required, Validators.minLength(8)],
      ],
    });
  }

  onSubmit() {
    if (this.customerForm.valid) {
      if (this.data.customer) {
        this.customerService
          .updateCustomer(this.data.customer.id, this.customerForm.value)
          .subscribe(() => {
            this.dialogRef.close(true);
          });
      } else {
        this.customerService
          .addCustomer(this.customerForm.value)
          .subscribe(() => {
            this.dialogRef.close(true);
          });
      }
    }
  }
}
