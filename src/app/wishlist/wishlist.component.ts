import {Component, OnInit} from '@angular/core';
import {WishlistService} from "../api/wishlist.service";

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{
  constructor(private wishlistService: WishlistService) {
  }

  ngOnInit() {
    this.getWishlist()
  }

  getWishlist(){
    console.log('Getting wishlist')
    this.wishlistService.getWishlist().subscribe(
      (response)=>{
        console.log(response)
      },(error)=>{
        console.log(error)
      }
    )
  }
}
