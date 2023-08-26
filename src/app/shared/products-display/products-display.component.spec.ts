import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsDisplayComponent } from './products-display.component';

describe('productsComponent', () => {
  let component: ProductsDisplayComponent;
  let fixture: ComponentFixture<ProductsDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsDisplayComponent]
    });
    fixture = TestBed.createComponent(ProductsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
