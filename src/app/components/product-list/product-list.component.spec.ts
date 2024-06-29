import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../services/product.service';
import { of } from 'rxjs';
import { Product } from '../../models/product';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', [
      'getProducts',
    ]);

    await TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: ProductService, useValue: productServiceSpy }],
    }).compileComponents();

    productService = TestBed.inject(
      ProductService,
    ) as jasmine.SpyObj<ProductService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    productService.getProducts.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch products on init', () => {
    const mockProducts: Product[] = [
      {
        id: 1,
        name: 'Product 1',
        price: 100,
        description: 'Description 1',
        url: 'product-1.jpg',
      },
      {
        id: 2,
        name: 'Product 2',
        price: 150,
        description: 'Description 2',
        url: 'product-2.jpg',
      },
    ];

    productService.getProducts.and.returnValue(of(mockProducts));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.products).toEqual(mockProducts);
  });
});
