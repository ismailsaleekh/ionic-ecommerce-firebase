import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {

  product: {} = {
    name:'',
    description:'',
    price: 0
  }
  subs

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public db: AngularFireDatabase
            ){}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductPage');
  }
  add(product){
    this.db.list('/products').push(product)
  }

}
