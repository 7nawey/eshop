import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent], // Import NavbarComponent
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}