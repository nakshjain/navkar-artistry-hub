import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelOrderDialogComponent } from './cancel-order-dialog.component';

describe('CancelOrderComponent', () => {
  let component: CancelOrderDialogComponent;
  let fixture: ComponentFixture<CancelOrderDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CancelOrderDialogComponent]
    });
    fixture = TestBed.createComponent(CancelOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
