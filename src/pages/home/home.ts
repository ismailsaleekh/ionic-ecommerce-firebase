import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddProductPage } from '../add-product/add-product';
import { AngularFireDatabase } from 'angularfire2/database';
import { CartProvider } from '../../providers/cart/cart';
import { LoginPage } from '../login/login';
import { StorageProvider } from '../../providers/storage/storage';
import { DbProvider } from '../../providers/db/db';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  search
  products: any[] = []
  constructor(public navCtrl: NavController,
              public db: AngularFireDatabase,
              public cart: CartProvider,
              public storeProvider: StorageProvider,
              public dbProvider: DbProvider
  ){}

  ngOnInit() {
    this.fetch()
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
    console.log(this.cart.cartList)
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
}
