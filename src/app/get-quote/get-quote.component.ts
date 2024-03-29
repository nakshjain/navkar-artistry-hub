import {Component, OnInit} from '@angular/core'
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../api/product.service";
import {Product} from "../types/products.types";

@Component({
  selector: 'app-get-quote',
  templateUrl: './get-quote.component.html',
  styleUrls: ['./get-quote.component.css']
})
export class GetQuoteComponent implements OnInit{
  yourInfo='Your Information'
  yourBudget='Your Budget'
  caption=`Unlock the Beauty of Artistry: Discover Your Canvas's Worth with a Custom Quote!`

  title='Get Quote'
  product: Product={
    productId:'',
    name:'',
    about:'',
    imageLinks:[''],
    category:'',
    subCategory:'',
    availability: '0',
    price:0,
    quantity:0
  };

  backgroundColor='#FFF0F5'

  titleDropdown=['Mr', 'Mrs', 'Miss']
  budgetDropdown=['100-1000', '1000-2000', '2000-3000']

  formData = {
    title: '',
    lastName:'',
    firstName:'',
    email: '',
    contactNumber: '',
    communicationMethod:'email',
    budget:''
  };
  greeting='Hello,'
  aboutUser=''
  contactUser=''
  budgetUser=''
  endingStatement= 'I look forward to your response and learning more about the offerings you provide. Thank you for your assistance.'
  enquiryMessage=''
  emailSubject=''
  emailBody=''
  emailAddress='navkarartistryhub@gmail.com'

  openEmailClient(): void {
    if (this.formData) {
      console.log()
      window.location.href = `mailto:${this.emailAddress}?subject=${this.emailSubject}&body=${this.emailBody}`;
    }
  }

  clearForm(){
    this.formData = {
      title: '',
      lastName:'',
      firstName:'',
      email: '',
      contactNumber: '',
      communicationMethod:'email',
      budget:''
    };
  }
  submitForm() {
    this.aboutUser=`I hope this message finds you well. My name is ` + this.formData.title+` `+this.formData.firstName+` `+this.formData.lastName+  ` . I am interested in your services and would like to inquire about the pricing details for`+this.product.productId+`.`
    this.contactUser=`Please reach out to me at `+this.formData.email+` or `+this.formData.contactNumber+` to provide the information. I prefer to be contacted via `+this.formData.communicationMethod+`.`
    this.budgetUser=`Additionally, I am curious about the budget required for this service. Could you please provide me with an estimate of the budget range? My budget for this project is approximately `+this.formData.budget+`.`
    this.enquiryMessage=this.greeting+'\n'+this.aboutUser+'\n'+this.contactUser+'\n'+this.budgetUser+'\n'+this.endingStatement

    this.emailSubject = encodeURIComponent(`Request for Information - Product Pricing`);
    this.emailBody = encodeURIComponent(this.enquiryMessage);
    this.clearForm()
    this.openEmailClient()
  }

  getProductById(id: string){
    this.productService.getProductById(id).subscribe(
      (product)=>{
        this.product=product;
      }
    )
    // this.productService.getProductById1(id).subscribe(
    //   (product)=>{
    //     if(product)
    //     this.product=product;
    //     this.ngxService.stop()
    //   }
    // )
  }

  constructor(private route: ActivatedRoute, private productService:ProductService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const productId = params['id'];
      this.getProductById(productId);
    });
  }
}
