import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css'],
})
export class ProductItemDetailComponent implements OnInit, OnDestroy {
  product: Product | undefined;
  private subscription: Subscription | undefined;
  selectedQuantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));

    if (productId) {
      this.subscription = this.productService.getProduct(productId)?.subscribe(
        (data: Product | undefined) => {
          if (data) {
            console.log('Product ID:', productId);
            console.log('Product detail:', data);
            this.product = data;
          } else {
            console.error(`Product with ID ${productId} not found`);
          }
        },
        (error) => {
          console.error('Error fetching product:', error);
        },
      );
    } else {
      console.error('Invalid product ID');
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadProduct(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.subscription = this.productService.getProduct(productId).subscribe(
      (data: Product | undefined) => {
        if (data) {
          console.log('Product ID:', productId);
          console.log('Product detail:', data);
          this.product = data;
        } else {
          console.error(`Product with ID ${productId} not found`);
          this.product = undefined;
        }
      },
      (error) => {
        console.error('Error fetching product:', error);
      },
    );
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
