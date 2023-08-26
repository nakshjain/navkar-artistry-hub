import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-browse-by-category',
  templateUrl: './browse-by-category.component.html',
  styleUrls: ['./browse-by-category.component.css']
})
export class BrowseByCategoryComponent implements OnInit{
  title='Browse By '
  categoryHeading='category'
  category: any;
  bgColor='lightbrown'

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.category= params['category'];
    });
    if(this.category){
      this.categoryHeading=this.category
    }
  }
}
