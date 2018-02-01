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
    console.log('Hello CartProvider Provider');
  }

}
