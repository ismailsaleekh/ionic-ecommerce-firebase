import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';


@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage implements OnInit {

  cartList: any[] = []
  totalSum = 0
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public cart: CartProvider
            ) {
              this.fetchList()
            }

  ionViewDidEnter() {
    
  }

  fetchList(){
    this.cartList = this.cart.cartList
    this.cartList.forEach(item=>{
      this.totalSum = +this.totalSum + +item.price
    })
    console.log('method worked')
  }
  ngOnInit(){
    console.log('oninit')
  }

  remove(item){
    this.cartList = this.cart.cartList.filter(cart=>{
      return cart !== item
    })
  }
  checkout(item){
    this.remove(item)
  }
}
