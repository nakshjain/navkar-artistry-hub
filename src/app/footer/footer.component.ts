import { Component } from '@angular/core';

import {faFacebook, faTwitter, faInstagram, faYoutube} from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  phoneNumber='1234567890'
  message=''
  emailAddress='info@navkarartistryhub.com'
  quickLinks: any[] = [
    {
      id: 'home',
      name: 'Home',
      link: 'home',
    },
    {
      id: 'shop',
      name: 'Shop',
      link: 'shop',
    },
    {
      id: 'contact-us',
      name: 'Contact Us',
      link: 'contact-us',
    },
  ];

  followUs: any[] = [
    {
      id: 'facebook',
      name: 'Facebook',
      icon:faFacebook,
      link: 'https://www.facebook.com/',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon:faInstagram,
      link: 'https://www.instagram.com/',
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon:faTwitter,
      link: 'https://www.twitter.com/',
    },
    {
      id: 'youtube',
      name: 'Youtube',
      icon:faYoutube,
      link: 'https://www.youtube.com/',
    },
  ];
  sendMessageOnWhatsApp() {
    const whatsappUrl = `https://wa.me/+91${this.phoneNumber}`;
    window.open(whatsappUrl, '_blank');
  }

  sendEmail() {
    const emailUrl = `mailto:${this.emailAddress}`;
    window.open(emailUrl, '_blank');
  }
}
