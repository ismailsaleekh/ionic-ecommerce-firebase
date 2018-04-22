import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CartPage } from '../cart/cart';
import { CartProvider } from '../../providers/cart/cart';
import { Observable } from 'rxjs/Observable';
import { FavoritesPage } from '../favorites/favorites';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CartPage;
  tab3Root = FavoritesPage;
  cartBadge: Observable<number>
  favBadge: Observable<number>
  

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public cart: CartProvider,
              public events: Events
              ) {
                events.subscribe('cart:added', length=>{
                  this.cartBadge = length
                })
                events.subscribe('cart:removed', length=>{
                  this.cartBadge = length
                })
                events.subscribe('fav:added', length => {
                  this.favBadge = length
                })
                events.subscribe('fav:removed', length => {
                  this.favBadge = length
                })
              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }
}
