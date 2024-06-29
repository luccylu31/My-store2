import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css'],
})
export class CheckoutFormComponent implements OnInit {
  checkoutForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private router: Router,
  ) {
    this.checkoutForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(6)],
      ],
      address: ['', Validators.required],
      creditCardNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{16}$')],
      ],
    });
  }

  ngOnInit(): void {}

  submitCheckoutForm(): void {
    if (this.checkoutForm.valid) {
      const order = {
        id: Math.floor(Math.random() * 1000000),
        customer: this.checkoutForm.value,
        items: this.cartService.getCartItems(),
        total: this.cartService.getTotalPrice(),
      };
      console.log('Order:', order);
      this.cartService.saveOrder(order);
      this.cartService.clearCart();
      this.router.navigate(['/confirmation']);
    }
  }
}
