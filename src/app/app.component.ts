import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Navkar Art';
  navbarHeader: any[] = [
    {
      id: 'home',
      name: 'Home',
      link: 'home',
    },
    {
      id: 'category',
      name: 'Category',
      link: 'category',
    },
    {
      id: 'products',
      name: 'Products',
      link: 'products',
    },
  ];
}
