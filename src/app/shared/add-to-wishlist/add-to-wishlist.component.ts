import {Component, Input, OnInit} from '@angular/core';
import {WishlistService} from "../../api/wishlist.service";
import {Product} from "../../types/products.types";
@Component({
  selector: 'app-add-to-wishlist',
  templateUrl: './add-to-wishlist.component.html',
  styleUrls: ['./add-to-wishlist.component.css']
})
export class AddToWishlistComponent implements OnInit{
  @Input()
  product: Product;

  isProductInWishlist=false

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
    const productId=this.product.productId
    if(this.isProductInWishlist){
      this.wishlistService.removeFromWishlist(productId).subscribe(
        (response)=>{
          const currentWishlist=this.wishlistService.wishlistCache.getValue()
          const updatedWishlist = currentWishlist.filter(item => item.productId !== productId);
          this.wishlistService.wishlistCache.next(updatedWishlist);
          this.isProductInWishlist=false
        },(error)=>{
          console.log(error)
        }
      )
    }
    else{
      this.wishlistService.addToWishlist(productId).subscribe(
        (res)=>{
          const currentWishlist=this.wishlistService.wishlistCache.getValue()
          currentWishlist.push(this.product);
          this.wishlistService.wishlistCache.next(currentWishlist);
          this.isProductInWishlist=true
        },(error)=>{
          console.log(error)
        }
      )
    }
  }
}
