import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';


@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  product: {} = {}

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public cart: CartProvider
            ) {
  }

  ionViewDidLoad() {
    this.product = this.cart.selectedProduct
  }


}
