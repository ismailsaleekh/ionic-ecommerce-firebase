import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { AddProductPage } from '../add-product/add-product';
import { AngularFireDatabase } from 'angularfire2/database';
import { CartProvider } from '../../providers/cart/cart';
import { LoginPage } from '../login/login';
import { StorageProvider } from '../../providers/storage/storage';
import { DbProvider } from '../../providers/db/db';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProfilePage } from '../profile/profile';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  search
  products: any[] = []
  constructor(public navCtrl: NavController,
              public db: AngularFireDatabase,
              public cart: CartProvider,
              public storeProvider: StorageProvider,
              public dbProvider: DbProvider,
              public events: Events,
              public auth: AngularFireAuth
  ){}

  ionViewDidEnter(){
    this.fetch()
    this.auth.authState.subscribe((data:any)=>{
      if(data) this.storeProvider.setUser({name: data.displayName, 
                                           email: data.email,
                                           photo: data.photoURL})
    })
  }
  goto(page){
    if(page == 'LoginPage')this.navCtrl.push(LoginPage)
    else if(page == 'AddProductPage')this.navCtrl.push(AddProductPage)
  }
  addToCart(name, description, price){
    let product = {
      name,
      description,
      price
    }
    this.cart.cartList.push(product)
    this.events.publish('cart:added', this.cart.cartList.length)
  }

  fetch(){
    this.dbProvider.fetchProducts().then(data=>{
      this.products = this.dbProvider.products
    })
  }
  onChange(event){
    console.log('onchange', event)
    console.log('search', this.search)
  }
  onCancel(event){
    console.log('onClear', event)
  }
  profile(){
    this.navCtrl.push(ProfilePage)
  }
}
