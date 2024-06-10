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
import {NgxUiLoaderConfig, NgxUiLoaderModule} from "ngx-ui-loader";
import {ProductComponent} from './product/product.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ShopComponent } from './shop/shop.component';
import {MatSelectModule} from "@angular/material/select";
import {MatCardModule} from "@angular/material/card";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GetQuoteComponent } from './get-quote/get-quote.component';
import { AddProductComponent } from './manage-products/add-product/add-product.component';
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
import { ManageProductsComponent } from './manage-products/manage-products.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import { ConfirmDeleteDialogComponent } from './manage-products/confirm-delete-dialog/confirm-delete-dialog.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentSuccessfulComponent } from './checkout/payment-successful/payment-successful.component';
import { PaymentFailedComponent } from './checkout/payment-failed/payment-failed.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { OrdersComponent } from './account/orders/orders.component';
import { AlertDialogComponent } from './home-page/alert-dialog/alert-dialog.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { BuyNowComponent } from './shared/buy-now/buy-now.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { AddProductImagesComponent } from './manage-products/add-product-images/add-product-images.component';
import {NgxDropzoneModule} from "ngx-dropzone";
import {MatSliderModule} from "@angular/material/slider";
import { CancelOrderDialogComponent } from './order-details/cancel-order/cancel-order-dialog.component';
import { ReviewsComponent } from './product/reviews/reviews.component';
import { WriteReviewDialogComponent } from './product/reviews/write-reviews/write-review-dialog.component';
import { StarRatingComponent } from './shared/star-rating/star-rating.component';
import { ReadReviewDialogComponent } from './product/reviews/read-review-dialog/read-review-dialog.component';
import { SitePoliciesComponent } from './site-policies/site-policies.component';
import { TermsOfUseComponent } from './site-policies/terms-of-use/terms-of-use.component';
import { PrivacyPolicyComponent } from './site-policies/privacy-policy/privacy-policy.component';
import { ReturnPolicyComponent } from './site-policies/return-policy/return-policy.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  "delay": 0,
  "fastFadeOut": true,
  "fgsColor": "#000000",
  "fgsPosition": "center-center",
  "fgsSize": 140,
  "fgsType": "three-strings",
  "gap": 24,
  "logoPosition": "center-center",
  "logoSize": 120,
  "logoUrl": "assets/logo.png",
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(40, 40, 40, 0.8)",
  "pbColor": "rgba(0,0,0,0.6)",
  "pbDirection": "ltr",
  "pbThickness": 2,
  "hasProgressBar": true,
}

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ImageSliderComponent,
    ProductComponent,
    ShopComponent,
    GetQuoteComponent,
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
    AddToWishlistComponent,
    ManageProductsComponent,
    ConfirmDeleteDialogComponent,
    CheckoutComponent,
    PaymentSuccessfulComponent,
    PaymentFailedComponent,
    OrdersComponent,
    AlertDialogComponent,
    OrderDetailsComponent,
    BuyNowComponent,
    SpinnerComponent,
    AddProductImagesComponent,
    CancelOrderDialogComponent,
    ReviewsComponent,
    WriteReviewDialogComponent,
    StarRatingComponent,
    ReadReviewDialogComponent,
    SitePoliciesComponent,
    TermsOfUseComponent,
    PrivacyPolicyComponent,
    ReturnPolicyComponent
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
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
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
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxDropzoneModule,
    MatSliderModule,
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
