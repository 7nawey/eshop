import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();

  isAddedToCart = false; // ✅ متغير لتتبع حالة الإضافة

  onAddToCart() {
    this.addToCart.emit(this.product);
    this.isAddedToCart = true; // ✅ إظهار الرسالة
    setTimeout(() => this.isAddedToCart = false, 3000); // ✅ إخفاؤها بعد 3 ثوانٍ
  }
}
