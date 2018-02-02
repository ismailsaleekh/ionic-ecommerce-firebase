import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {

  product: {} = {}
  authors: string[] = []
  genres: string[] = []

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public db: AngularFireDatabase,
              public storage: Storage
            ){
              this.getValues()
            }

  ionViewDidLoad() {
  }
  add(product){
    product.addedTime = Date.now()
    this.db.list('/products/').push(product)
    this.product = {}
  }

  getValues(){
    this.storage.get('genres').then(data=>{
      this.genres = data
    })
    this.storage.get('authors').then(data=>{
      this.authors = data
    })
  }

}
