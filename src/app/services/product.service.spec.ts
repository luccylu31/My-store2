import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';

describe('ProductService', () => {
  let productService: ProductService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });
    productService = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  it('should return products from getProducts()', () => {
    const mockProducts: Product[] = [
      {
        id: 1,
        name: 'Product 1',
        price: 10,
        description: 'Description 1',
        url: 'image-url-1',
      },
      {
        id: 2,
        name: 'Product 2',
        price: 20,
        description: 'Description 2',
        url: 'image-url-2',
      },
    ];

    productService.getProducts().subscribe((products) => {
      expect(products.length).toBe(2);
      expect(products).toEqual(mockProducts);
    });

    const req = httpTestingController.expectOne('assets/data.json');
    expect(req.request.method).toEqual('GET');
    req.flush(mockProducts);
  });

  it('should return product with specific id from getProduct()', () => {
    const productId = 1;
    const mockProduct: Product = {
      id: productId,
      name: 'Product 1',
      price: 10,
      description: 'Description 1',
      url: 'image-url-1',
    };

    productService.getProduct(productId).subscribe((product) => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpTestingController.expectOne('assets/data.json');
    expect(req.request.method).toEqual('GET');
    req.flush([mockProduct]);

  });
});
