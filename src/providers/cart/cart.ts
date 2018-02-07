import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

@Injectable()
export class CartProvider {

  cartList: any[] = []
  selectedProduct: {} = {}

  constructor(public storage: Storage,
              public events: Events) {
  }

  addtoCart(product){
    this.cartList.push(product)
    this.AddToStorage(this.cartList)
  }

  async AddToStorage(list){
    console.log('addtostorage', list)
    list = list.filter(item=>{
      return item.quantity !== 0
    })
    this.events.publish('cart:added', list.length)    
    this.storage.set('cart', list)
  }
  async GetFromStorage(){
    const list = this.storage.get('cart')
    return list
  }

}
