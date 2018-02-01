import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddProductPage } from '../add-product/add-product';
import { AngularFireDatabase } from 'angularfire2/database';
import { CartProvider } from '../../providers/cart/cart';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  products: any[] = []
  constructor(public navCtrl: NavController,
              public db: AngularFireDatabase,
              public cart: CartProvider            
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
    this.db.list('/products/').snapshotChanges().subscribe((data:any)=>{
        data.forEach(product=>{
          let pr = {
            key: product.key,
            name: product.payload.val().name,
            description: product.payload.val().description,
            price: product.payload.val().price
          }
        this.products.push(pr)
      })
      console.log(this.products)
    })
  }
}
