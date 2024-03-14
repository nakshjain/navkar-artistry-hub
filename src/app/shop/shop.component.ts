import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NgxUiLoaderService} from "ngx-ui-loader";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit{
  title=''
  categoryHeading='Shop'
  category='';

  constructor(private ngxService:NgxUiLoaderService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.ngxService.start()
    this.activatedRoute.params.subscribe(params => {
      this.category= params['category'];
    });
    if(this.category){
      this.categoryHeading=this.category
    }
  }
}
