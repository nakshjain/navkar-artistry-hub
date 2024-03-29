import {Component, OnInit} from '@angular/core';
import {WishlistService} from "../api/wishlist.service";
import {Router} from "@angular/router";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {Product} from "../types/products.types";

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{
  wishlist: Product[]=[];
  isUserLoggedIn=false
  constructor(private ngxUiLoaderService:NgxUiLoaderService,
              private wishlistService: WishlistService,
              private router: Router) {
  }

  ngOnInit() {
    const storedUserDetails = sessionStorage.getItem('userDetails');
    if(storedUserDetails){
      this.isUserLoggedIn=true
    }
    this.getWishlist()
  }

  getWishlist(){
    this.ngxUiLoaderService.start()
    if(this.isUserLoggedIn){
      this.wishlistService.getWishlist().subscribe(
        (response)=>{
          this.wishlist=response.wishlist
          this.ngxUiLoaderService.stop()
        },(error)=>{
          console.log(error)
          this.ngxUiLoaderService.stop()
        }
      )
    }
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
