import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root' // ✅ تأكد من وجود هذا السطر
})
export class ProductService {
  private apiUrl = 'https://localhost:7260/api/product';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<{ $values: Product[] }>(this.apiUrl).pipe(
      map(response => response.$values) // استخراج البيانات الفعلية
    );
  }
  

  getProduct(id: number): Observable<Product | undefined> {
    return this.getProducts().pipe(
      map((products) => products.find(p => p.productId === id))
    );
  }
  
}
