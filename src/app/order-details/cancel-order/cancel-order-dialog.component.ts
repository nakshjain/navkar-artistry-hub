import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-cancel-order',
  templateUrl: './cancel-order-dialog.component.html',
  styleUrls: ['./cancel-order-dialog.component.css']
})
export class CancelOrderDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }
  reasons = [
    'Found a better price',
    'No longer needed',
    'Change of mind',
    'Item not as described',
    'Other'
  ];
}
