import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadReviewDialogComponent } from './read-review-dialog.component';

describe('ReadReviewDialogComponent', () => {
  let component: ReadReviewDialogComponent;
  let fixture: ComponentFixture<ReadReviewDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadReviewDialogComponent]
    });
    fixture = TestBed.createComponent(ReadReviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
