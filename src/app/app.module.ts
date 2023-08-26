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
import {ProductsComponent} from "./shared/products.component";
import {ProductComponent} from './shared/product/product.component';
import {FormsModule} from "@angular/forms";
import { FilterComponent } from './shared/filter/filter.component';
import { FollowUsComponent } from './follow-us/follow-us.component';
import { BrowseByCategoryComponent } from './browse-by-category/browse-by-category.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { ProductsDisplayComponent } from './shared/products-display/products-display.component';
import {MatSelectModule} from "@angular/material/select";
import {MatCardModule} from "@angular/material/card";
import {HttpClientModule} from "@angular/common/http";
import {ProductRatingComponent} from "./shared/product/product-rating/product-rating.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ImageSliderComponent,
    ProductsComponent,
    ProductComponent,
    FilterComponent,
    FollowUsComponent,
    BrowseByCategoryComponent,
    AllProductsComponent,
    ProductsDisplayComponent,
    ProductRatingComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
