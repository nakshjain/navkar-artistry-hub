import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {ProductComponent} from "./product/product.component";
import {GetQuoteComponent} from "./get-quote/get-quote.component";
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
import {CheckoutComponent} from "./checkout/checkout.component";
import {PaymentSuccessfulComponent} from "./checkout/payment-successful/payment-successful.component";
import {PaymentFailedComponent} from "./checkout/payment-failed/payment-failed.component";
import {OrdersComponent} from "./account/orders/orders.component";
import {OrderDetailsComponent} from "./order-details/order-details.component";
import {HomePageComponent} from "./home-page/home-page.component";

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'shop', component: ShopComponent},
  { path: 'shop/:category', component: ShopComponent},
  { path: 'shop/:category/:subCategory', component: ShopComponent},
  { path: 'search', component: SearchResultsComponent},
  { path: 'product/:id', component: ProductComponent},
  { path: 'get-quote/:id', component: GetQuoteComponent},
  { path: 'cart', component: CartComponent},
  { path: 'wishlist', component: WishlistComponent},
  { path: 'checkout/:paymentOrderId', canActivate:[authGuard], component: CheckoutComponent},
  { path: 'paymentSuccessful/:paymentOrderId', canActivate:[authGuard], component: PaymentSuccessfulComponent},
  { path: 'paymentFailed/:paymentOrderId', canActivate:[authGuard], component: PaymentFailedComponent},
  { path: 'your-account',
    component: AccountComponent,
    canActivate:[authGuard],
    children:[
      { path: '', redirectTo: '/', pathMatch: 'full' },
      { path: 'profile', component: ProfileComponent},
      { path: 'address-book', component: AddressBookComponent},
      { path: 'orders', component: OrdersComponent},
    ]
  },
  { path: 'order-details/:orderId', canActivate:[authGuard], component: OrderDetailsComponent},
  { path: 'manage-products', canActivate:[authGuard,roleGuard], component: ManageProductsComponent},
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
