import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: { product: Product; quantity: number }[] = [];
  private orders: any[] = [];

  constructor(private router: Router) {}

  addToCart(product: Product, quantityToAdd: number | string): void {
    const quantity =
      typeof quantityToAdd === 'string'
        ? parseInt(quantityToAdd)
        : quantityToAdd;

    const index = this.cartItems.findIndex(
      (item) => item.product.id === product.id,
    );

    if (index !== -1) {
      this.cartItems[index].quantity += quantity; 
    } else {
      this.cartItems.push({ product: product, quantity: quantity });
    }
  }

  getCartItems(): { product: Product; quantity: number }[] {
    return this.cartItems;
  }

  viewCart(): void {
    this.router.navigate(['/cart']);
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(
      (item) => item.product.id !== productId,
    );
  }

  clearCart(): void {
    this.cartItems = [];
  }

  getTotalQuantity(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  }

  updateCartItem(updatedItem: { product: Product; quantity: number }): void {
    const index = this.cartItems.findIndex(
      (item) => item.product.id === updatedItem.product.id,
    );
    if (index !== -1) {
      this.cartItems[index].quantity = updatedItem.quantity;
    }
  }

  goToCheckout(): void {
    this.router.navigate(['/checkout']);
  }

  saveOrder(order: any): void {
    this.orders.push(order);
  }

  getOrderById(orderId: string): any | null {
    return this.orders.find((order) => order.id === orderId) || null;
  }

  getLastOrder(): any | null {
    return this.orders.length > 0 ? this.orders[this.orders.length - 1] : null;
  }
}
