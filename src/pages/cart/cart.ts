import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';


@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  cartList: any[] = []
  totalSum = 0
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public cart: CartProvider,
              public events: Events
            ) {
            }

  ionViewDidEnter() {
    this.fetchList()
  }

  fetchList(){
    this.cartList = this.cart.cartList
    this.changeSum()
  }

  remove(item){
    this.cart.cartList = this.cart.cartList.filter(cart=>{
      return cart !== item
    })
    this.fetchList()
    this.changeSum()
    this.events.publish('cart:removed', this.cartList.length)
  }
  checkout(item){
    this.remove(item)
  }
  changeSum(){
    this.totalSum = 0
    this.cartList.forEach(element => {
     this.totalSum = +this.totalSum + +element.price
    });
  }
}
