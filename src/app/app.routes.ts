import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component'; // استيراد CartComponent
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent }, // 🔹 إضافة صفحة الكارت هنا
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '/products' } // Wildcard route for 404
];
