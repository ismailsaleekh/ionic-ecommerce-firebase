import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FavoritesProvider } from '../../providers/favorites/favorites';
import { ProductPage } from '../product/product';


@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  public favList: any[] = []
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public favProvider: FavoritesProvider
) { }

  async ionViewDidLoad() {
    this.favList = await this.favProvider.getFromStorage()
    console.log(this.favList)
  }

  goToProduct(product) {
    this.navCtrl.push(ProductPage, product)
  }

  remove(product) {
    this.favList = this.favList.filter(item => {
      return item.key !== product.key
    })
    this.favProvider.setToStorage(this.favList)
  }
}
