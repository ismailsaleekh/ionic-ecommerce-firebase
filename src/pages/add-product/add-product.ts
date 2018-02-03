import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Storage } from '@ionic/storage';
import { StorageProvider } from '../../providers/storage/storage';
import { DbProvider } from '../../providers/db/db';

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
              public storage: Storage,
              public alertCtrl: AlertController,
              public storeProvider: StorageProvider,
              public dbProvider: DbProvider
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

  authorsAlert(){
    let alert = this.alertCtrl.create({
      title: 'Add new author',
      message: 'Please add a name of an author',
      inputs:[
        {
        name: 'authorName',
        placeholder: 'Name of author',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data=>{
            console.log('canceled')
          }
        },
        {
          text: 'Create',
          handler: (data:any)=>{
            if(data.authorName)this.setAuthor(data)
          }
        }
      ]
    })
    alert.present()
  }

  genresAlert(){
    let alert = this.alertCtrl.create({
      title: 'Add new genre',
      message: 'Please write a new genre',
      inputs:[
        {
        name: 'genreName',
        placeholder: 'Name of genre',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data=>{
            console.log('canceled')
          }
        },
        {
          text: 'Create',
          handler: (data:any)=>{
            if(data.genreName)this.setGenre(data)
          }
        }
      ]
    })
    alert.present()
  }
  
  setAuthor(name){
    this.db.list('/authors/').push(name).then(data=>{
      this.getValues()
    })
  }
  setGenre(name){
    this.db.list('/genres/').push(name).then(data=>{
       this.getValues()
     })
  }

  getValues(){
    this.dbProvider.fetchAuthors().then(data=>{
      this.genres = this.dbProvider.genres
    })
    this.dbProvider.fetchGenres().then(data=>{
      this.authors = this.dbProvider.authors
    })
  }

}
