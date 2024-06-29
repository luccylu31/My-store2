import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';
import { of } from 'rxjs';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers: [CartService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize cartItems and totalPrice on ngOnInit', () => {
    const mockCartItems: { product: Product; quantity: number }[] = [
      {
        product: {
          id: 1,
          name: 'Product 1',
          price: 10,
          description: 'Description 1',
          url: 'url1',
        },
        quantity: 2,
      },
      {
        product: {
          id: 2,
          name: 'Product 2',
          price: 20,
          description: 'Description 2',
          url: 'url2',
        },
        quantity: 1,
      },
    ];
    spyOn(cartService, 'getCartItems').and.returnValue(mockCartItems);

    component.ngOnInit();

    expect(component.cartItems).toEqual(mockCartItems);
    expect(component.totalPrice).toEqual(40);
  });

  it('should remove item from cart', () => {
    const productIdToRemove = 1;
    spyOn(cartService, 'removeFromCart').and.stub();
    spyOn(component, 'loadCartItems').and.stub();
    spyOn(component, 'calculateTotalPrice').and.stub();

    component.removeFromCart(productIdToRemove);

    expect(cartService.removeFromCart).toHaveBeenCalledWith(productIdToRemove);
    expect(component.loadCartItems).toHaveBeenCalled();
    expect(component.calculateTotalPrice).toHaveBeenCalled();
  });

  it('should update cart item quantity', () => {
    const mockCartItem = {
      product: {
        id: 1,
        name: 'Product 1',
        price: 10,
        description: 'Description 1',
        url: 'url1',
      },
      quantity: 2,
    };
    const newQuantity = 5;
    const event = { target: { valueAsNumber: newQuantity } };

    spyOn(cartService, 'updateCartItem').and.stub();
    spyOn(component, 'calculateTotalPrice').and.stub();

    component.updateCartItem(mockCartItem, newQuantity);

    expect(mockCartItem.quantity).toEqual(newQuantity);
    expect(cartService.updateCartItem).toHaveBeenCalledWith(mockCartItem);
    expect(component.calculateTotalPrice).toHaveBeenCalled();
  });

  it('should clear cart', () => {
    spyOn(cartService, 'clearCart').and.stub();
    spyOn(component, 'loadCartItems').and.stub();
    spyOn(component, 'calculateTotalPrice').and.stub();

    component.clearCart();

    expect(cartService.clearCart).toHaveBeenCalled();
    expect(component.loadCartItems).toHaveBeenCalled();
    expect(component.calculateTotalPrice).toHaveBeenCalled();
  });

  it('should navigate to checkout', () => {
    spyOn(cartService, 'goToCheckout').and.stub();

    component.goToCheckout();

    expect(cartService.goToCheckout).toHaveBeenCalled();
  });
});
