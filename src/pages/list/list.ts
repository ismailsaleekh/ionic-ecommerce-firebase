import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  list: any[] = []

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public dbProvider: DbProvider
) { }

  async ionViewDidLoad(){
    const type = this.navParams.get('type')
    const value = this.navParams.get('value')

    this.list = await this.dbProvider.fetchProducts()
   
    this.list = this.list.filter(item => {
      return item[type].includes(value)
    })
  }

}
