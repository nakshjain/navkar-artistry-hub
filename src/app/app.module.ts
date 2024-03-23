import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import { HomePageComponent } from './home-page/home-page.component';
import { ImageSliderComponent } from './shared/image-slider/image-slider.component';
import {SlickCarouselModule} from "ngx-slick-carousel";
import {NgxUiLoaderModule} from "ngx-ui-loader";
import {ProductComponent} from './shared/product/product.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ShopComponent } from './shop/shop.component';
import {MatSelectModule} from "@angular/material/select";
import {MatCardModule} from "@angular/material/card";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GetQuoteComponent } from './get-quote/get-quote.component';
import { HomePageMainComponent } from './home-page-main/home-page-main.component';
import { AddProductComponent } from './add-product/add-product.component';
import {MatDialogModule} from "@angular/material/dialog";
import { LoginComponent } from './login/login.component';
import {MatMenuModule} from "@angular/material/menu";
import {AuthInterceptor} from "./interceptor/auth.interceptor";
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './navbar/navbar.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import { SearchResultsComponent } from './search-results/search-results.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { AddToCartComponent } from './shared/add-to-cart/add-to-cart.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CartComponent } from './cart/cart.component';
import { AccountComponent } from './account/account.component';
import { AddressBookComponent } from './account/address-book/address-book.component';
import { ProfileComponent } from './account/profile/profile.component';
import { AddAddressComponent } from './account/address-book/add-address/add-address.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { AddToWishlistComponent } from './shared/add-to-wishlist/add-to-wishlist.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ImageSliderComponent,
    ProductComponent,
    ShopComponent,
    GetQuoteComponent,
    HomePageMainComponent,
    AddProductComponent,
    LoginComponent,
    FooterComponent,
    NavbarComponent,
    SearchResultsComponent,
    AddToCartComponent,
    CartComponent,
    AccountComponent,
    ProfileComponent,
    AddressBookComponent,
    AddAddressComponent,
    WishlistComponent,
    AddToWishlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatSelectModule,
    SlickCarouselModule,
    NgxUiLoaderModule,
    MatCardModule,
    NgbModule,
    MatDialogModule,
    MatMenuModule,
    FontAwesomeModule,
    MatAutocompleteModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
