import { Component } from '@angular/core';

import {faFacebook, faTwitter, faInstagram, faYoutube} from "@fortawesome/free-brands-svg-icons";

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
      id: 'facebook',
      name: 'Facebook',
      icon:faFacebook,
      link: 'home',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon:faInstagram,
      link: 'faInstagram',
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon:faTwitter,
      link: 'faTwitter',
    },
    {
      id: 'youtube',
      name: 'Youtube',
      icon:faYoutube,
      link: 'Youtube',
    },
  ];

}
