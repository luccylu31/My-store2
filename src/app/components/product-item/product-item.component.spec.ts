import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductItemComponent } from './product-item.component';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';

describe('ProductItemComponent', () => {
  let component: ProductItemComponent;
  let fixture: ComponentFixture<ProductItemComponent>;
  let router: Router;
  let cartService: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductItemComponent],
      imports: [RouterTestingModule],
      providers: [CartService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    cartService = TestBed.inject(CartService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to product detail page on viewDetails', () => {
    const spy = spyOn(router, 'navigate').and.stub();
    component.product = {
      id: 1,
      name: 'Product 1',
      price: 10,
      description: 'Description',
      url: 'image-url',
    };

    component.viewDetails();

    expect(spy).toHaveBeenCalledWith(['/product-detail', component.product.id]);
  });

  it('should call cartService.addToCart when addToCart is called with valid product and quantity', () => {
    const spy = spyOn(cartService, 'addToCart').and.stub();
    component.product = {
      id: 1,
      name: 'Product 1',
      price: 10,
      description: 'Description',
      url: 'image-url',
    };
    component.selectedQuantity = 2;

    component.addToCart();

    expect(spy).toHaveBeenCalledWith(
      component.product,
      component.selectedQuantity,
    );
  });

  it('should alert when addToCart is called with invalid quantity', () => {
    const spy = spyOn(window, 'alert').and.stub();
    component.product = {
      id: 1,
      name: 'Product 1',
      price: 10,
      description: 'Description',
      url: 'image-url',
    };
    component.selectedQuantity = 0;

    component.addToCart();

    expect(spy).toHaveBeenCalledWith(
      'Please select a quantity greater than zero.',
    );
  });
});
