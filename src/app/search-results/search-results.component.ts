import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Product} from "../types/products.types";
import {ProductService} from "../api/product.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {auto} from "@popperjs/core";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit{
  toSearch=''
  searchQuery=''

  constructor(private route: ActivatedRoute) {
  }

  executeSearch(){
    this.searchQuery=this.toSearch
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['query']) {
        this.searchQuery = params['query'];
        console.log('Search query:', this.searchQuery);
      }
    });
  }

}
