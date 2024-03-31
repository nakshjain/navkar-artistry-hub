import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {ProductComponent} from "./product/product.component";
import {GetQuoteComponent} from "./get-quote/get-quote.component";
import {HomePageMainComponent} from "./home-page-main/home-page-main.component";
import {SearchResultsComponent} from "./search-results/search-results.component";
import {ShopComponent} from "./shop/shop.component";
import {authGuard} from "./security/auth.guard";
import {roleGuard} from "./security/role.guard";
import {CartComponent} from "./cart/cart.component";
import {AccountComponent} from "./account/account.component";
import {AddressBookComponent} from "./account/address-book/address-book.component";
import {ProfileComponent} from "./account/profile/profile.component";
import {WishlistComponent} from "./wishlist/wishlist.component";
import {ManageProductsComponent} from "./manage-products/manage-products.component";

const routes: Routes = [
  { path: '', component: HomePageMainComponent },
  { path: 'home', component: HomePageMainComponent },
  { path: 'shop', component: ShopComponent},
  { path: 'shop/:category', component: ShopComponent},
  { path: 'shop/:category/:subCategory', component: ShopComponent},
  { path: 'search', component: SearchResultsComponent},
  { path: 'product/:id', component: ProductComponent},
  { path: 'get-quote/:id', component: GetQuoteComponent},
  { path: 'cart', component: CartComponent},
  { path: 'wishlist', component: WishlistComponent},
  { path: 'manage-products', canActivate:[authGuard,roleGuard], component: ManageProductsComponent},
  { path: 'my-account',
    component: AccountComponent,
    canActivate:[authGuard],
    children:[
      { path: '', redirectTo: '/', pathMatch: 'full' },
      { path: 'profile', component: ProfileComponent},
      { path: 'address-book', component: AddressBookComponent}
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top'
    }),
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
