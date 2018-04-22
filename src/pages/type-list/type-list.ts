import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import { ListPage } from '../list/list';


@IonicPage()
@Component({
  selector: 'page-type-list',
  templateUrl: 'type-list.html',
})
export class TypeListPage {

  list: any[] = []
  type: string = ''

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public dbProvider: DbProvider
  ) { }

  async ionViewDidLoad() {
    this.type = this.navParams.get('type')
    console.log(this.type)
    this.list = await this.dbProvider[`fetch${this.type}`]()
  }

  goToList(value: string) {
    if (this.type === 'Genres') {
      this.navCtrl.push(ListPage, {
        type: 'subject',
        value: value
      })
    } else if (this.type === 'Authors') {
      this.navCtrl.push(ListPage, {
        type: 'creator',
        value: value
      })
    } else {
      this.navCtrl.push(ListPage, {
        type: 'publisher',
        value: value
      })
    }
  }

}
