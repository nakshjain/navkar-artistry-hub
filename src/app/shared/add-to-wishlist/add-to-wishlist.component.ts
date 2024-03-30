import {Component, Input, OnInit} from '@angular/core';
import {WishlistService} from "../../api/wishlist.service";
import {Product} from "../../types/products.types";
import {animate, style, transition, trigger} from "@angular/animations";
@Component({
  selector: 'app-add-to-wishlist',
  templateUrl: './add-to-wishlist.component.html',
  styleUrls: ['./add-to-wishlist.component.css'],
  animations: [
    trigger('pulsate', [
      transition('void => *', [
        animate('0.5s ease-in-out', style({ transform: 'scale(1.1)' })),
        animate('0.5s ease-in-out', style({ transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class AddToWishlistComponent implements OnInit{
  @Input()
  product: Product;

  isProductInWishlist=false
  isPulsating: boolean = false;

  constructor(private wishlistService: WishlistService) {
    this.product = {
      productId: "",
      name: "",
      about: "",
      imageLinks: [""],
      category: "",
      subCategory: "",
      availability: "",
      price: 0,
      quantity: 0
    };
    this.checkIfInWishlist()
  }

  ngOnInit(){
    this.checkIfInWishlist()
  }

  checkIfInWishlist(){
    this.wishlistService.wishlistCache.subscribe(
      (wishlist)=>{
        if(wishlist.length!==0){
          this.isProductInWishlist=wishlist.some((item)=> item.productId===this.product.productId)
        }
      }
    )
  }

  toggleWishList(){
    this.isPulsating = true;
    const productId=this.product.productId
    if(this.isProductInWishlist){
      this.wishlistService.removeFromWishlist(productId).subscribe(
        (response)=>{
          const currentWishlist=this.wishlistService.wishlistCache.getValue()
          const updatedWishlist = currentWishlist.filter(item => item.productId !== productId);
          this.wishlistService.wishlistCache.next(updatedWishlist);
          this.isProductInWishlist=false
          this.isPulsating = false
        },(error)=>{
          console.error(error)
          this.isPulsating = false
        }
      )
    }
    else{
      this.wishlistService.addToWishlist(productId).subscribe(
        (response)=>{
          const currentWishlist=this.wishlistService.wishlistCache.getValue()
          currentWishlist.push(this.product);
          this.wishlistService.wishlistCache.next(currentWishlist);
          this.isProductInWishlist=true
          this.isPulsating = false
        },(error)=>{
          console.error(error)
          this.isPulsating = false
        }
      )
    }
  }
}
