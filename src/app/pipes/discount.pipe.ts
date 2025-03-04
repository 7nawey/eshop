import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'discount' })
export class DiscountPipe implements PipeTransform {
  transform(price: number, discount?: number): string {
    if (!discount) return `${price.toFixed(2)} EGP`;
    const discounted = price * (1 - discount / 100);
    return `${discounted.toFixed(2)} EGP (was ${price.toFixed(2)} EGP)`;
  }
}