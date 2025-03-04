import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule], // Import required modules
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      username: ['', [Validators.required, this.noWhitespaceValidator]],
      password: ['', [Validators.required, this.passwordValidator]],
      confirmPassword: ['', Validators.required],
      addresses: this.fb.array([this.createAddressGroup()]) // Initialize with one address
    }, { validator: this.passwordMatchValidator });
  }

  // Custom validator for no whitespace in username
  noWhitespaceValidator(control: AbstractControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    return isWhitespace ? { whitespace: true } : null;
  }

  // Custom validator for password strength
  passwordValidator(control: AbstractControl) {
    const value = control.value;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasDigit = /\d/.test(value);
    const hasSpecialChar = /[@$!%*?&]/.test(value);
    const valid = hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar && value.length >= 8;
    return valid ? null : { passwordStrength: true };
  }

  // Custom validator for password match
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // Create address form group
  createAddressGroup(): FormGroup {
    return this.fb.group({
      address: ['', Validators.required],
      street: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  // Getter for addresses FormArray
  get addresses(): FormArray {
    return this.registerForm.get('addresses') as FormArray;
  }

  // Add a new address
  addAddress() {
    this.addresses.push(this.createAddressGroup());
  }

  // Remove an address
  removeAddress(index: number) {
    this.addresses.removeAt(index);
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    console.log('Registration Successful', this.registerForm.value);
    this.router.navigate(['/login']);
  }
  
}