import { ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ProductItemDetailComponent } from './product-item-detail.component';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { of, throwError } from 'rxjs';
import { Product } from '../../models/product';

describe('ProductItemDetailComponent', () => {
  let component: ProductItemDetailComponent;
  let fixture: ComponentFixture<ProductItemDetailComponent>;
  let productService: jasmine.SpyObj<ProductService>;
  let cartService: jasmine.SpyObj<CartService>;
  let route: ActivatedRoute;

  const mockProduct: Product = {
    id: 1,
    name: 'Product 1',
    price: 10,
    description: 'Description of Product 1',
    url: 'https://example.com/product1.jpg',
  };

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', [
      'getProduct',
    ]);
    const cartServiceSpy = jasmine.createSpyObj('CartService', ['addToCart']);

    await TestBed.configureTestingModule({
      declarations: [ProductItemDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } },
        },
        { provide: ProductService, useValue: productServiceSpy },
        { provide: CartService, useValue: cartServiceSpy },
      ],
    }).compileComponents();

    productService = TestBed.inject(
      ProductService,
    ) as jasmine.SpyObj<ProductService>;
    cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
    route = TestBed.inject(ActivatedRoute);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product details when product is found', fakeAsync(() => {
    productService.getProduct.and.returnValue(of(mockProduct));

    component.ngOnInit();
    tick();

    expect(component.product).toEqual(mockProduct);
  }));

  it('should handle error when product is not found', fakeAsync(() => {
    productService.getProduct.and.returnValue(throwError('Product not found'));

    component.ngOnInit();
    tick();

    expect(component.product).toBeUndefined();
  }));

  it('should add product to cart with selected quantity', () => {
    component.product = mockProduct;
    component.selectedQuantity = 3;

    component.addToCart();

    expect(cartService.addToCart).toHaveBeenCalledWith(mockProduct, 3);
  });
});
