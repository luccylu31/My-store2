import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: { product: Product; quantity: number }[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotalPrice();
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.loadCartItems();
    this.calculateTotalPrice();
    alert('Item has been removed from the cart.');
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  }

  updateCartItem(
    cartItem: { product: Product; quantity: number },
    event: any,
  ): void {
    const newQuantity = event.target.valueAsNumber;
    if (!isNaN(newQuantity)) {
      cartItem.quantity = newQuantity;
      this.cartService.updateCartItem(cartItem);
      this.calculateTotalPrice();
    }
  }

  getTotalQuantity(): number {
    return this.cartService.getTotalQuantity();
  }

  getTotalPrice(): number {
    return this.totalPrice;
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.loadCartItems();
    this.calculateTotalPrice();
  }

  goToCheckout(): void {
    this.cartService.goToCheckout();
  }
}
