import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  providers: [ProductService], // ✅ إزالة CartService من هنا
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product$!: Observable<Product | undefined>;
  isAddedToCart: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService, // ✅ استخدام CartService من root
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.product$ = this.productService.getProduct(id);
    } else {
      console.error('Invalid product ID');
    }
  }

  addToCart(product: Product) {
    if (!product) {
      console.error('No product found!');
      return;
    }
    
    console.log('Adding to cart:', product); // ✅ التحقق من المنتج في الـ Console
    
    this.cartService.addToCart(product);
    this.isAddedToCart = true;
  
    setTimeout(() => {
      this.isAddedToCart = false;
    }, 3000);
  }

  goBack() {
    this.router.navigate(['/products']);
  }
}