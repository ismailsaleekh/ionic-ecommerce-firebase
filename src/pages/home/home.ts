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
import { ProductPage } from '../product/product';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  display: string = 'block'
  search
  products: any[] = []
  genres: string[] = []
  newestBooks: object[] = []
  uzbBooks: object[] = []
  rusBooks: object[] = []
  engBooks: object[] = []
  foreignBooks: object[] = []
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
  addToCart(product){
    product.quantity = product.quantity || 1
    
    const index = this.cart.cartList.findIndex(item=>{
      return item.key === product.key
    })
    if(index === -1) {
      this.cart.addtoCart(product)
    }
    else {
      this.cart.cartList[index].quantity += 1
      this.cart.AddToStorage(this.cart.cartList)
      console.log(this.cart.cartList[index].quantity, 'now there are')
    }
    this.events.publish('cart:added', this.cart.cartList.length)    
  }

  async fetch(){
    this.dbProvider.fetchProducts().then(data=>{
      this.products = this.dbProvider.products
      this.events.subscribe('byLang', (uzb, rus, eng, foreign)=>{
        this.uzbBooks = uzb
        this.rusBooks = rus
        this.engBooks = eng
        this.foreignBooks = foreign
      })
      this.events.subscribe('lastAdded', (newest)=>{
        this.newestBooks = newest
      })
    })
    this.dbProvider.fetchGenres().then(data=>{
      this.genres = this.dbProvider.genres
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
  }
  selectProduct(product){
    console.log('selected', product)
    this.cart.selectedProduct = product
    this.navCtrl.push(ProductPage) 
  }
  scroll(event){
    if(event.directionY === 'down')this.display = 'none'
    else this.display = 'block'
    console.log(this.display)
  }
  isSimilar(item, index, arr){

  }
}
