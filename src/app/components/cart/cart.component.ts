import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  @Input() cartItems: { product: Product; quantity: number }[] = [];
  @Output() cartItemsChange = new EventEmitter<{ product: Product; quantity: number }[]>();
  @Output() itemRemoved = new EventEmitter<number>();
  @Output() itemQuantityUpdated = new EventEmitter<{ product: Product, quantity: number }>();

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
    this.itemRemoved.emit(productId);
    this.cartItemsChange.emit(this.cartItems);
    alert('Item has been deleted!');
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  }

  updateCartItem(cartItem: { product: Product; quantity: number }, newQuantity: number): void {
    if (!isNaN(newQuantity)) {
      cartItem.quantity = newQuantity;
      this.cartService.updateCartItem(cartItem);
      this.calculateTotalPrice();
      this.itemQuantityUpdated.emit({ product: cartItem.product, quantity: newQuantity });
      this.cartItemsChange.emit(this.cartItems);
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
    this.cartItemsChange.emit(this.cartItems);
  }

  goToCheckout(): void {
    this.cartService.goToCheckout();
  }
}
