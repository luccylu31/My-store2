import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent implements OnInit {
  order: any | null = null;

  constructor(
    private cartService: CartService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.order = this.cartService.getLastOrder();
    if (this.order) {
      console.log('Received order:', this.order); 
    } else {
      console.log('No order information available');
    }
  }

  handleSubmit() {
    console.log('Handling submission...');
    this.router.navigate(['/thank-you']);
  }
}
