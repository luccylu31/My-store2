import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CheckoutFormComponent } from './checkout-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('CheckoutFormComponent', () => {
  let component: CheckoutFormComponent;
  let fixture: ComponentFixture<CheckoutFormComponent>;
  let cartService: CartService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckoutFormComponent],
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule],
      providers: [CartService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutFormComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize checkoutForm with default values', () => {
    expect(component.checkoutForm).toBeDefined();
    expect(component.checkoutForm.get('name')).toBeDefined();
    expect(component.checkoutForm.get('email')).toBeDefined();
    expect(component.checkoutForm.get('address')).toBeDefined();
    expect(component.checkoutForm.get('creditCardNumber')).toBeDefined();
  });

  it('should mark form as invalid if empty', () => {
    component.checkoutForm.setValue({
      name: '',
      email: '',
      address: '',
      creditCardNumber: '',
    });
    expect(component.checkoutForm.valid).toBeFalsy();
  });

  it('should mark form as valid if all fields are filled', () => {
    component.checkoutForm.setValue({
      name: 'Daniel',
      email: 'daniel@example.com',
      address: 'Ho Chi Minh City',
      creditCardNumber: '1234567890000000',
    });
    expect(component.checkoutForm.valid).toBeTruthy();
  });

  it('should call cartService.saveOrder and clearCart when submitting valid form', () => {
    spyOn(cartService, 'saveOrder').and.stub();
    spyOn(cartService, 'clearCart').and.stub();
    spyOn(router, 'navigate').and.stub();

    component.checkoutForm.setValue({
      name: 'Daniel',
      email: 'daniel@example.com',
      address: 'Ho Chi Minh City',
      creditCardNumber: '1234567890000000',
    });

    component.submitCheckoutForm();

    expect(cartService.saveOrder).toHaveBeenCalled();
    expect(cartService.clearCart).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/confirmation']);
  });

  it('should not call saveOrder or clearCart when submitting invalid form', () => {
    spyOn(cartService, 'saveOrder').and.stub();
    spyOn(cartService, 'clearCart').and.stub();
    spyOn(router, 'navigate').and.stub();

    component.checkoutForm.setValue({
      name: '',
      email: '',
      address: '',
      creditCardNumber: '',
    });

    component.submitCheckoutForm();

    expect(cartService.saveOrder).not.toHaveBeenCalled();
    expect(cartService.clearCart).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalledWith(['/confirmation']);
  });
});
