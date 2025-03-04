import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems: { product: Product; quantity: number; }[] = [];

  constructor(public cartService: CartService) {  
    this.cartItems = this.cartService.getCartItems();
  }

  // ✅ حذف منتج معين من السلة
  removeItem(product: Product) {
    this.cartService.removeItem(product);
    this.cartItems = this.cartService.getCartItems(); // تحديث القائمة بعد الحذف
  }

  // ✅ تقليل الكمية لمنتج معين
  decreaseQuantity(product: Product) {
    this.cartService.decreaseQuantity(product);
    this.cartItems = this.cartService.getCartItems(); // تحديث القائمة بعد التعديل
  }

  increaseQuantity(product: Product) {
    this.cartService.increaseQuantity(product);
    this.cartItems = this.cartService.getCartItems(); // تحديث القائمة بعد التعديل
  }



  // ✅ تفريغ السلة بالكامل
  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
  }
}
