import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteReviewDialogComponent } from './write-review-dialog.component';

describe('WriteReviewsComponent', () => {
  let component: WriteReviewDialogComponent;
  let fixture: ComponentFixture<WriteReviewDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WriteReviewDialogComponent]
    });
    fixture = TestBed.createComponent(WriteReviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
