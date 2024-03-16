import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {ProductComponent} from "./shared/product/product.component";
import {GetQuoteComponent} from "./get-quote/get-quote.component";
import {HomePageMainComponent} from "./home-page-main/home-page-main.component";
import {AddProductComponent} from "./add-product/add-product.component";
import {SearchResultsComponent} from "./search-results/search-results.component";
import {ShopComponent} from "./shop/shop.component";
import {authGuard} from "./security/auth.guard";
import {MyProfileComponent} from "./my-profile/my-profile.component";
import {roleGuard} from "./security/role.guard";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageMainComponent },
  { path: 'shop', component: ShopComponent},
  { path: 'shop/:category', component: ShopComponent},
  { path: 'shop/:category/:subCategory', component: ShopComponent},
  { path: 'search-results', component: SearchResultsComponent},
  { path: 'product/:id', component: ProductComponent},
  { path: 'get-quote/:id', component: GetQuoteComponent},
  { path: 'add-product', canActivate:[authGuard,roleGuard], component: AddProductComponent},
  { path: 'my-profile', canActivate:[authGuard], component: MyProfileComponent},
];

@NgModule({
  imports: [
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
