import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CartService } from '../services/cart.service'; // استيراد CartService

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products; // الآن products تحتوي على المصفوفة مباشرةً
      },
      error: (err) => console.error('Error fetching products:', err)
    });
    
   
    
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product); // إضافة المنتج إلى `CartService`
  }
}
