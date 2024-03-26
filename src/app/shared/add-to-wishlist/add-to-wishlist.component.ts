import {Component, Input, OnInit} from '@angular/core';
import {WishlistService} from "../../api/wishlist.service";
@Component({
  selector: 'app-add-to-wishlist',
  templateUrl: './add-to-wishlist.component.html',
  styleUrls: ['./add-to-wishlist.component.css']
})
export class AddToWishlistComponent implements OnInit{
  @Input()
  product: any

  isProductInWislist=false

  constructor(private wishlistService: WishlistService) {
    this.checkIfInWishlist()
  }

  ngOnInit(){
    this.checkIfInWishlist()
  }

  checkIfInWishlist(){
    this.wishlistService.wishlistCache.subscribe(
      (wishlist)=>{
        if(wishlist.length!==0){
          this.isProductInWislist=wishlist.some((item)=> item.productId===this.product.productId)
        }
      }
    )
  }

  toggleWishList(){
    const productId=this.product.productId
    if(this.isProductInWislist){
      this.wishlistService.removeFromWishlist(productId).subscribe(
        (response)=>{
          const currentWishlist=this.wishlistService.wishlistCache.getValue()
          const updatedWishlist = currentWishlist.filter(item => item.productId !== productId);
          this.wishlistService.wishlistCache.next(updatedWishlist);
          this.isProductInWislist=false
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
          this.isProductInWislist=true
        },(error)=>{
          console.log(error)
        }
      )
    }
  }
}
