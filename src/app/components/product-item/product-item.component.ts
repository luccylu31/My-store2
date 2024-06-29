import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent {
  @Input() product!: Product;
  selectedQuantity: number = 1;

  constructor(
    private router: Router,
    private cartService: CartService,
  ) {}

  viewDetails(): void {
    if (this.product && this.product.id !== undefined) {
      this.router.navigate(['/product-detail', this.product.id]);
    } else {
      console.error('Product or product id is undefined.');
    }
  }

  addToCart(): void {
    if (this.product && this.selectedQuantity > 0) {
      this.cartService.addToCart(this.product, this.selectedQuantity);
      alert('Added to cart!');
    } else {
      alert('Please select a quantity greater than zero.');
    }
  }
}
