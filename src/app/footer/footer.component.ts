import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  contactUs: any[] = [
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

  quickLinks: any[] = [
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

  followUs: any[] = [
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
