import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseByCategoryComponent } from './browse-by-category.component';

describe('BrowseBycategoryComponent', () => {
  let component: BrowseByCategoryComponent;
  let fixture: ComponentFixture<BrowseByCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrowseByCategoryComponent]
    });
    fixture = TestBed.createComponent(BrowseByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
