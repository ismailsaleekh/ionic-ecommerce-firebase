import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';


@Injectable()
export class FavoritesProvider {

  favoritesList: any[] = []

  constructor(private storage: Storage,
              private events: Events
  ) {
    this.getFromStorage()
   }

  public async addToFav(product) {
    
    const list = await this.getFromStorage()

    const index = list.findIndex(item => {
      return item.key === product.key
    })

    if (index === -1) {
      list.push(product)   

      this.setToStorage(list)
            
      this.events.publish('fav:added', list.length)
    } else {
      return null
    }
  }

  setToStorage(products: object[]) {
    this.storage.set('favoritesList', products)
    this.events.publish('fav:added', products.length)
  }

  async getFromStorage() {
    const list = await this.storage.get('favoritesList')
    if (!list) {
      return []
    } else {
      this.events.publish('fav:added', list.length)
      return list
    }
  }

  clearFavs() {
    this.storage.remove('favoritesList')
  }
}
