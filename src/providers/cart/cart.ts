import { Injectable } from '@angular/core';

@Injectable()
export class CartProvider {

  cartList: any[] = []

  constructor() {
  }

  async AddToCart(product){
    this.cartList.push(product)
  }

}
