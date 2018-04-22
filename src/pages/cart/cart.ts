import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';
import { DbProvider } from '../../providers/db/db';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';


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
              public events: Events,
              public dbProvider: DbProvider,
              public auth: AngularFireAuth
            ) {
            }

  ionViewDidEnter() {
    this.fetchList()
  }

  async fetchList(){
    if (await this.cart.getFromStorage()) {
      this.cartList = await this.cart.getFromStorage()
    }
  }

  remove(item){
    this.cartList = this.cartList.filter(cart=>{
      return cart.key !== item.key
    })
    this.cart.cartList = this.cartList
    this.cart.addToStorage(this.cartList)
    this.changeSum()
    this.events.publish('cart:removed', this.cartList.length)
  }
  checkout(item){
    if(this.auth.auth.currentUser) {
      const user = this.auth.auth.currentUser
      item.user_name = user.displayName
      item.user_email = user.email
    }
    else {
      this.navCtrl.push(LoginPage)
    }
    this.dbProvider.checkout(item)
    this.remove(item)
  }
  changeSum(){
    this.totalSum = 0
    this.cartList.forEach(element => {
     this.totalSum = +this.totalSum + (+element.price * element.quantity) 
    });
  }
  increase(item){
    item.quantity++
    this.changeSum()
    this.cart.addToStorage(this.cartList)
  }
  decrease(item){
    item.quantity -= 1
    
    if(item.quantity <= 0) {
      this.remove(item)
    }
    this.changeSum()    
    this.cart.addToStorage(this.cartList)
  }
}
