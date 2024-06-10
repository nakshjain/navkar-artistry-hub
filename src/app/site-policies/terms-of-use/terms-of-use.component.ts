import {Component, ElementRef} from '@angular/core';

@Component({
  selector: 'app-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  styleUrls: ['./terms-of-use.component.css']
})
export class TermsOfUseComponent {
  tableOfContent=[
    { id: 'our-services', name: 'OUR SERVICES', href: '#our-services' },
    { id: 'intellectual-property-rights', name: 'INTELLECTUAL PROPERTY RIGHTS', href: '#intellectual-property-rights' },
    { id: 'user-representations', name: 'USER REPRESENTATIONS', href: '#user-representations' },
    { id: 'user-registration', name: 'USER REGISTRATION', href: '#user-registration' },
    { id: 'products', name: 'PRODUCTS', href: '#products' },
    { id: 'purchases-and-payment', name: 'PURCHASES AND PAYMENT', href: '#purchases-and-payment' },
    { id: 'return-policy', name: 'RETURN POLICY', href: '#return-policy' },
    { id: 'prohibited-activities', name: 'PROHIBITED ACTIVITIES', href: '#prohibited-activities' },
    { id: 'user-generated-contributions', name: 'USER GENERATED CONTRIBUTIONS', href: '#user-generated-contributions' },
    { id: 'contribution-license', name: 'CONTRIBUTION LICENSE', href: '#contribution-license' },
    { id: 'guidelines-for-reviews', name: 'GUIDELINES FOR REVIEWS', href: '#guidelines-for-reviews' },
    { id: 'third-party-websites-and-content', name: 'THIRD-PARTY WEBSITES AND CONTENT', href: '#third-party-websites-and-content' },
    { id: 'services-management', name: 'SERVICES MANAGEMENT', href: '#services-management' },
    { id: 'privacy-policy', name: 'PRIVACY POLICY', href: '#privacy-policy' },
    { id: 'term-and-termination', name: 'TERM AND TERMINATION', href: '#term-and-termination' },
    { id: 'modifications-and-interruptions', name: 'MODIFICATIONS AND INTERRUPTIONS', href: '#modifications-and-interruptions' },
    { id: 'governing-law', name: 'GOVERNING LAW', href: '#governing-law' },
    { id: 'dispute-resolution', name: 'DISPUTE RESOLUTION', href: '#dispute-resolution' },
    { id: 'corrections', name: 'CORRECTIONS', href: '#corrections' },
    { id: 'disclaimer', name: 'DISCLAIMER', href: '#disclaimer' },
    { id: 'limitations-of-liability', name: 'LIMITATIONS OF LIABILITY', href: '#limitations-of-liability' },
    { id: 'indemnification', name: 'INDEMNIFICATION', href: '#indemnification' },
    { id: 'user-data', name: 'USER DATA', href: '#user-data' },
    { id: 'electronic-communications-transactions-and-signatures', name: 'ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES', href: '#electronic-communications-transactions-and-signatures' },
    { id: 'miscellaneous', name: 'MISCELLANEOUS', href: '#miscellaneous' },
    { id: 'contact-us', name: 'CONTACT US', href: '#contact-us' }
  ]
}
