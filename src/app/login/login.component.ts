import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // Import RouterModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // Add RouterModule here
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  emailInvalid: boolean = false;
  passwordInvalid: boolean = false;

  constructor(private router: Router) {}

  validateEmail() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.emailInvalid = this.email.length > 0 && !emailPattern.test(this.email);
  }

  validatePassword() {
    this.passwordInvalid = this.password.length > 0 && this.password.length < 6;
  }

  onSubmit() {
    if (!this.emailInvalid && !this.passwordInvalid) {
      console.log('Login Successful');
      this.router.navigate(['/products']);
    } else {
      console.log('Invalid email or password');
    }
  }
}