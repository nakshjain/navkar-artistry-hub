import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {BASE_URL} from "./config";
import {HttpClient} from "@angular/common/http";
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl =BASE_URL+'/order'
  private paymentId=''
  private isPaymentSuccessful=false
  constructor(private http: HttpClient,
              @Inject(PLATFORM_ID) private platformId: object) { }

  getAllOrders(){
    return this.http.get<any>(`${this.baseUrl}/getAllOrders`)
  }

  createPaymentOrder(cart: any, userId: any){
    return this.http.post<any>(`${this.baseUrl}/createPaymentOrder`, {cart: cart, userId: userId})
  }

  verifyPaymentSignature(response: any, paymentOrderId: any){
    return this.http.post<any>(`${this.baseUrl}/validatePayment`, {response: response, paymentOrderId: paymentOrderId})
  }

  get nativeWindow(): any {
    if (isPlatformBrowser(this.platformId)) {
      return _window();
    }
  }

  verifyOrderId(orderId: any) {
    return this.http.post<any>(`${this.baseUrl}/verifyOrderId`, {orderId: orderId})
  }

  addAddress(address: any, paymentOrderId: string) {
    return this.http.post<any>(`${this.baseUrl}/addAddress`, {address: address, paymentOrderId:paymentOrderId})
  }

  setPaymentDetails(isPaymentSuccessful: boolean, paymentId?: any){
    this.isPaymentSuccessful=isPaymentSuccessful
    if(paymentId){
      this.paymentId=paymentId
    }
  }

  getPaymentDetails(){
    return {
      isPaymentSuccessful: this.isPaymentSuccessful,
      paymentId: this.paymentId
    }
  }

  deleteOrder(orderId: string){
    return this.http.delete<any>(`${this.baseUrl}/deleteOrder/${orderId}`)
  }
}

function _window(): any {
  return window;
}
