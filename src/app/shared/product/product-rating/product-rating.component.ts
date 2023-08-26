import {Component, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'app-product-rating',
  templateUrl: './product-rating.component.html',
  styleUrls: ['./product-rating.component.css']
})
export class ProductRatingComponent implements OnChanges{
  @Input()
  rating!: number;
  stars!: number[];
  filledStars!: number;
  hasHalfStar!: boolean;

  ngOnChanges(): void {
    this.stars = [1, 2, 3, 4, 5];
    this.filledStars = Math.round(this.rating);
    const fractionalPart=this.rating - Math.floor(this.rating)
    this.hasHalfStar = fractionalPart<0.5 && fractionalPart!=0
  }
}
