import {Component, OnInit} from '@angular/core';
import {WishlistService} from "../api/wishlist.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{
  wishlist: any
  constructor(private wishlistService: WishlistService,
              private router: Router) {
  }

  ngOnInit() {
    this.getWishlist()
  }

  getWishlist(){
    this.wishlistService.getWishlist().subscribe(
      (response)=>{
        console.log(response)
        this.wishlist=response.wishlist
        console.log(this.wishlist)
      },(error)=>{
        console.log(error)
      }
    )
  }

  continueShopping(){
    this.router.navigate(['/shop']);
  }

  viewProductDetails(productId: string): void {
    this.router.navigate(['product', productId]);
  }

  removeFromWishlist(product: any){
    const productId=product.productId
    this.wishlistService.removeFromWishlist(productId).subscribe(
      (response)=>{
        const currentWishlist=this.wishlistService.wishlistCache.getValue()
        const updatedWishlist = currentWishlist.filter(item => item.productId !== productId);
        this.wishlistService.wishlistCache.next(updatedWishlist);
        this.getWishlist()
      },(error)=>{
        console.log(error)
      }
    )
  }
}
