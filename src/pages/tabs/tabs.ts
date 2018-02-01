import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CartPage } from '../cart/cart';
import { ProfilePage } from '../profile/profile';
import { CartProvider } from '../../providers/cart/cart';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CartPage;
  tab3Root = ProfilePage;
  badge: number = 0
  

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public cart: CartProvider
              ) {if(cart.cartList)this.badge = cart.cartList.length}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
