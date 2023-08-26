import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit{
  searchText=''
  @Input()
  hideFilterBar: boolean=false
  @Input()
  hideSearchBar: boolean=false
  @Input()
  hideSelectBar: boolean=false
  @Input()
  categoryName=''
  @Input()
  categories=['category1', 'category2', 'category3']
  @Output()
  categorySelected: EventEmitter<string>=new EventEmitter<string>()
  oncategorySelectChanged(event: any){
    const categorySelect= event.value
    this.categorySelected.emit(categorySelect)
  }
  @Output()
  searchTextChanged: EventEmitter<string>=new EventEmitter<string>()
  onSearchTextChanged(){
    this.searchTextChanged.emit(this.searchText)
  }
  ngOnInit() {
    if(this.categoryName.length!==0){
      const categoryToEmit=this.categoryName
      this.hideSelectBar=true
      this.categorySelected.emit(categoryToEmit)
    }
  }
}
