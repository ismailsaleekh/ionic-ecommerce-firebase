import { Injectable } from '@angular/core';

/*
  Generated class for the CartProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CartProvider {

  cartList: any[] = []

  constructor() {
  }

  async AddToCart(product){
    this.cartList.push(product)
  }

}
