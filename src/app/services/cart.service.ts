import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: { product: Product; quantity: number; }[] = [];
  private cartSubject = new BehaviorSubject<{ product: Product; quantity: number; }[]>([]);

  cart$ = this.cartSubject.asObservable(); // ✅ إتاحة التحديثات للمكونات الأخرى

  constructor() {}

  getCartItems() {
    return this.cartItems;
  }

  addToCart(product: Product) {
    const existingItem = this.cartItems.find(item => item.product.productId === product.productId);
    
    if (existingItem) {
      existingItem.quantity++; 
    } else {
      this.cartItems.push({ product, quantity: 1 });
    }
    this.cartSubject.next([...this.cartItems]); // 🔥 تحديث القائمة للمشتركين
  }

  removeItem(product: Product) {
    this.cartItems = this.cartItems.filter(item => item.product.productId !== product.productId);
    this.cartSubject.next([...this.cartItems]); // 🔥 تحديث القائمة للمشتركين
  }

  decreaseQuantity(product: Product) {
    const item = this.cartItems.find(item => item.product.productId === product.productId);
    if (item) {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        this.removeItem(product);
      }
      this.cartSubject.next([...this.cartItems]); // 🔥 تحديث القائمة للمشتركين
    }
  }

  increaseQuantity(product: Product) {
    const item = this.cartItems.find(item => item.product.productId === product.productId);
    if (item) {
      item.quantity++;
      this.cartSubject.next([...this.cartItems]); // 🔥 تحديث القائمة للمشتركين
    }
  }

  clearCart() {
    this.cartItems = [];
    this.cartSubject.next([...this.cartItems]); // 🔥 تحديث القائمة للمشتركين
  }
}
