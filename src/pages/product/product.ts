import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';
import { FavoritesProvider } from '../../providers/favorites/favorites';


@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  product: any = {}
  inFav: boolean = false

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public cart: CartProvider,
    public favoritesProvider: FavoritesProvider
  ) { }

  async ionViewDidLoad() {
    this.product = this.navParams.data

    const list = await this.favoritesProvider.getFromStorage()

    const index = list.findIndex(item => {
      return item.key === this.product.key
    })

    if (index !== -1) {
      this.inFav = true
    }
  }

  async addToFavs(product) {
    await this.favoritesProvider.addToFav(product)
    this.inFav = true
  }
}
