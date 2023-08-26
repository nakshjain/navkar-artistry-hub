import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedProductsComponent } from './archived-products.component';

describe('AllproductsComponent', () => {
  let component: ArchivedProductsComponent;
  let fixture: ComponentFixture<ArchivedProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArchivedProductsComponent]
    });
    fixture = TestBed.createComponent(ArchivedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
