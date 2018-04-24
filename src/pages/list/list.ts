import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import { ProductPage } from '../product/product';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  list: any[] = []
  value: string = ''

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public dbProvider: DbProvider
) { }

  async ionViewDidLoad(){
    this.list = await this.dbProvider.fetchProducts()
    const type = this.navParams.get('type')
    this.value = this.navParams.get('value')
   

    this.list = this.list.filter(item => {
    console.log(item[type])      
      return item[type].includes(this.value)
    })
  }

  goToProduct(product) {
    this.navCtrl.push(ProductPage, product)
  }

}
