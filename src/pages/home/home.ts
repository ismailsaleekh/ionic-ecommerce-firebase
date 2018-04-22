import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';
import { LoginPage } from '../login/login';
import { DbProvider } from '../../providers/db/db';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProfilePage } from '../profile/profile';
import { ProductPage } from '../product/product';
import { LoginProvider } from '../../providers/login/login';
import { ListPage } from '../list/list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  search: string = ''
  products: any[] = []
  genres: string[] = []
  newestBooks: object[] = []
  uzbBooks: object[] = []
  rusBooks: object[] = []
  engBooks: object[] = []
  foreignBooks: object[] = []
  photoURL: string = ''

  constructor(public navCtrl: NavController,
    public cart: CartProvider,
    public dbProvider: DbProvider,
    public events: Events,
    public auth: AngularFireAuth,
    public loginProvider: LoginProvider
  ) { }

  ionViewDidEnter() {
    this.fetch()
  }
  goto(page) {
    if (page == 'LoginPage') this.navCtrl.push(LoginPage)
  }


  async fetch() {
    this.products = await this.dbProvider.fetchProducts()
    this.genres = await this.dbProvider.fetchGenres()

    this.events.subscribe('sortedProducts', ({ uzbBooks, rusBooks, engBooks, foreignBooks, lastAdded }) => {
      this.uzbBooks = uzbBooks
      this.rusBooks = rusBooks
      this.engBooks = engBooks
      this.foreignBooks = foreignBooks
      this.newestBooks = lastAdded
    })
  }

  getByGenre(genre) {
    console.log('clicked', genre)
    this.navCtrl.push(ListPage, {
      type: 'subject',
      value: genre
    })
  }
  selectProduct(product) {
    console.log('selected', product)
    this.navCtrl.push(ProductPage, product)
  }

  isSimilar(item, index, arr) {
  }

  onChange() {
    this.navCtrl.push(ListPage, {
      type: 'title',
      value: this.search
    })
  }

  onCancel(event) {
    console.log('onClear', event)
  }

  profile() {
    this.navCtrl.push(ProfilePage)
  }
}
