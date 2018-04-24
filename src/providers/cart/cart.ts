import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

@Injectable()
export class CartProvider {

  cartList: any[] = []

  constructor(public storage: Storage,
              public events: Events
) {
    this.getFromStorage()
  }


  public addToStorage(list){
    list = list.filter(item=>{
      return item.quantity !== 0
    })
    this.events.publish('cart:added', list.length)    
    this.storage.set('cart', list)
  }

  public async getFromStorage(){
    const list = await this.storage.get('cart')
    if (list) {
      this.events.publish('cart:added', list.length)
      return list
    } else {
      return []
    }
  }

  addToCart(product){
    product.quantity = product.quantity || 1
    
    const index = this.cartList.findIndex(item=>{
      return item.key === product.key
    })

    if(index === -1) {
      this.cartList.push(product)
      this.addToStorage(this.cartList)
    }
    else {
      this.cartList[index].quantity += 1
      this.addToStorage(this.cartList)
      console.log(this.cartList[index].quantity, 'now there are')
    }
    this.events.publish('cart:added', this.cartList.length)    
  }

}
