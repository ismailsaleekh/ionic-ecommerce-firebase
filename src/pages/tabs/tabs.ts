import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CartPage } from '../cart/cart';
import { ProfilePage } from '../profile/profile';
import { CartProvider } from '../../providers/cart/cart';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CartPage;
  tab3Root = ProfilePage;
  badge: Observable<number>
  

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public cart: CartProvider,
              public events: Events
              ) {
                events.subscribe('cart:added', length=>{
                  this.badge = length
                })
                events.subscribe('cart:removed', length=>{
                  this.badge = length
                })
              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }
}
