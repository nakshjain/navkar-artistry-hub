import { Component } from '@angular/core';

@Component({
  selector: 'app-site-policies',
  templateUrl: './site-policies.component.html',
  styleUrls: ['./site-policies.component.css']
})
export class SitePoliciesComponent {
  policies=[
    {
      id: 'terms-of-use',
      name:'Terms Of Use',
      link:'/terms-of-use'
    },
    {
      id: 'privacy-policy',
      name:'Privacy Policy',
      link:'/privacy-policy'
    },
    {
      id: 'return-policy',
      name:'Return Policy',
      link:'/return-policy'
    },
  ]

}
