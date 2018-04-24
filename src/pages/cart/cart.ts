import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';
import { DbProvider } from '../../providers/db/db';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { CheckoutPage } from '../checkout/checkout';


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
    public auth: AngularFireAuth,
    public modalCtrl: ModalController
  ) {
  }

  async ionViewDidEnter() {
    this.cartList = await this.cart.getFromStorage()
    this.changeSum()
  }

  remove(item) {
    this.cartList = this.cartList.filter(cart => {
      return cart.key !== item.key
    })
    this.cart.cartList = this.cartList
    this.cart.addToStorage(this.cartList)
    this.changeSum()
    this.events.publish('cart:removed', this.cartList.length)
  }

  checkout(item) {
    let modal = this.modalCtrl.create(CheckoutPage, { totalSum: this.totalSum })
    modal.onDidDismiss(({name, email, phone, address}) => {
      if (phone && address) {
        const checkout: any = {}
        this.cartList.forEach((element, index) => {
          element.totalPrice = element.quantity * element.price
          checkout[`product${index + 1}`] = element
          this.remove(element)
        });
        checkout.user_name = name
        checkout.user_email = email
        checkout.user_phone = phone
        checkout.user_address = address
        checkout.isDelivered = false

        this.dbProvider.checkout(checkout)
      } else {
        return
      }
    })
    modal.present()
  }

  changeSum() {
    this.totalSum = 0
    this.cartList.forEach(element => {
      this.totalSum = +this.totalSum + (+element.price * element.quantity)
    });
  }

  increase(item) {
    item.quantity++
    this.changeSum()
    this.cart.addToStorage(this.cartList)
  }

  decrease(item) {
    item.quantity -= 1

    if (item.quantity <= 0) {
      this.remove(item)
    }
    
    this.changeSum()
    this.cart.addToStorage(this.cartList)
  }
}
