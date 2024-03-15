import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

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
        this.toSearch=this.searchQuery
      }
    });
  }

}
