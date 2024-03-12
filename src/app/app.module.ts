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
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AvailableProductsComponent } from './available-products/available-products.component';
import { ArchivedProductsComponent } from './archived-products/archived-products.component';
import { ProductsDisplayComponent } from './shared/products-display/products-display.component';
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

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ImageSliderComponent,
    ProductsComponent,
    ProductComponent,
    FilterComponent,
    ContactUsComponent,
    AvailableProductsComponent,
    ArchivedProductsComponent,
    ProductsDisplayComponent,
    GetQuoteComponent,
    HomePageMainComponent,
    AddProductComponent,
    LoginComponent,
    FooterComponent,

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
