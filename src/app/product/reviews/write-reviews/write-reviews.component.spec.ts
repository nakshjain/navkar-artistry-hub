import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteReviewsComponent } from './write-reviews.component';

describe('WriteReviewsComponent', () => {
  let component: WriteReviewsComponent;
  let fixture: ComponentFixture<WriteReviewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WriteReviewsComponent]
    });
    fixture = TestBed.createComponent(WriteReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
