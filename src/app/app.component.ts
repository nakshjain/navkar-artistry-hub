import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isSearchBarOpen = false;

  toggleSearchBar() {
    this.isSearchBarOpen = !this.isSearchBarOpen;
  }
  title = 'NAH';
  navbarHeader: any[] = [
    {
      id: 'home',
      name: 'Home',
      link: 'home',
    },
    {
      id: 'artists',
      name: 'Artists',
      link: 'artists',
    },
    {
      id: 'products',
      name: 'Products',
      link: 'products',
    },
    {
      id: 'archived-products',
      name: 'Archived',
      link: 'archived-products',
    },
  ];
}
