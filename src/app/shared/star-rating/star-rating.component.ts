import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnChanges{
  @Input()
  rating:any
  @Input()
  isInput=true

  @Output() givenRating: EventEmitter<any>=new EventEmitter<any>()

  matIcons: string[]=[]
  constructor() {
    this.setRating()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['rating']) {
      this.setRating();
    }
  }

  setRating(){
    this.rating=Math.round(this.rating * 2) / 2
    this.matIcons=[]
    for(let i=1;i<=5;i++){
      if(this.rating >= i){
        this.matIcons.push('star')
      } else{
        if(i - this.rating === 0.5){
          this.matIcons.push('star_half')
        }
        else{
          this.matIcons.push('star_bordered')
        }
      }
    }
  }

  addRating(i: number) {
    this.rating=i+1
    this.setRating()
    this.givenRating.emit(this.rating)
  }
}
