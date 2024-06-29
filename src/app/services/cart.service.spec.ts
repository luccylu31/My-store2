import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CartService } from './cart.service';
import { Product } from '../models/product';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add product to cart', () => {
    const product: Product = {
      id: 1,
      name: 'Product 1',
      price: 10,
      url: '',
      description: '',
    };
    service.addToCart(product, 2);
    expect(service.getCartItems().length).toBe(1);
    expect(service.getCartItems()[0].product).toBe(product);
    expect(service.getCartItems()[0].quantity).toBe(2);
  });

  it('should update quantity if product is already in cart', () => {
    const product1: Product = {
      id: 1,
      name: 'Product 1',
      price: 10,
      url: '',
      description: '',
    };
    const product2: Product = {
      id: 2,
      name: 'Product 2',
      price: 20,
      url: '',
      description: '',
    };

    service.addToCart(product1, 1);
    service.addToCart(product2, 2);
    service.addToCart(product1, 3);

    expect(service.getCartItems().length).toBe(2);
    expect(
      service.getCartItems().find((item) => item.product.id === product1.id)
        ?.quantity,
    ).toBe(4);
  });

  it('should remove product from cart', () => {
    const product1: Product = {
      id: 1,
      name: 'Product 1',
      price: 10,
      url: '',
      description: '',
    };
    const product2: Product = {
      id: 2,
      name: 'Product 2',
      price: 20,
      url: '',
      description: '',
    };

    service.addToCart(product1, 1);
    service.addToCart(product2, 2);
    service.removeFromCart(product1.id);

    expect(service.getCartItems().length).toBe(1);
    expect(service.getCartItems()[0].product).toBe(product2);
  });

  it('should clear cart', () => {
    const product: Product = {
      id: 1,
      name: 'Product 1',
      price: 10,
      url: '',
      description: '',
    };

    service.addToCart(product, 1);
    service.clearCart();

    expect(service.getCartItems().length).toBe(0);
  });

  it('should calculate total quantity in cart', () => {
    const product1: Product = {
      id: 1,
      name: 'Product 1',
      price: 10,
      url: '',
      description: '',
    };
    const product2: Product = {
      id: 2,
      name: 'Product 2',
      price: 20,
      url: '',
      description: '',
    };

    service.addToCart(product1, 2);
    service.addToCart(product2, 3);

    expect(service.getTotalQuantity()).toBe(5);
  });

  it('should calculate total price in cart', () => {
    const product1: Product = {
      id: 1,
      name: 'Product 1',
      price: 10,
      url: '',
      description: '',
    };
    const product2: Product = {
      id: 2,
      name: 'Product 2',
      price: 20,
      url: '',
      description: '',
    };

    service.addToCart(product1, 2);
    service.addToCart(product2, 3);

    expect(service.getTotalPrice()).toBe(80);
  });

  it('should save and retrieve orders correctly', () => {
    const order1 = {
      id: '1',
      customer: { name: 'Daniel', email: 'daniel@example.com' },
      items: [],
      total: 0,
    };
    const order2 = {
      id: '2',
      customer: { name: 'Daniel', email: 'daniel@example.com' },
      items: [],
      total: 0,
    };

    service.saveOrder(order1);
    service.saveOrder(order2);

    expect(service.getOrderById('1')).toEqual(order1);
    expect(service.getOrderById('2')).toEqual(order2);
  });

  it('should retrieve last order correctly', () => {
    const order1 = {
      id: '1',
      customer: { name: 'Daniel', email: 'daniel@example.com' },
      items: [],
      total: 0,
    };
    const order2 = {
      id: '2',
      customer: { name: 'Daniel', email: 'daniel@example.com' },
      items: [],
      total: 0,
    };

    service.saveOrder(order1);
    service.saveOrder(order2);

    expect(service.getLastOrder()).toEqual(order2);
  });
});
