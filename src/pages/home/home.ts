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
  genres: string[] = []
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
    this.dbProvider.fetchGenres().then(data=>{
      this.genres = this.dbProvider.genres
      console.log('genres', this.genres)
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
  getByGenre(genre){
    console.log('clicked', genre)
    let booksByGenre: any[] = []
    this.products.forEach(pr=>{
      pr.genre.forEach(element => {
        if(element === genre) booksByGenre.push(pr)
      });
    })
    console.log('after', booksByGenre)
    this.lastAdded()
    this.getByLang('Uzbek')
  }
  lastAdded(){
    let newest = this.products
    newest.sort(this.sortProduct)
    console.log('newest', newest)
  }
  sortProduct(a,b){
    if(a > b) return 1
    if(a < b) return -1
  }

  getByLang(lang){
    const byLang = this.products.filter(pr=>{
      return pr.language === lang
    })
    console.log('byLang', byLang)
  }
}
