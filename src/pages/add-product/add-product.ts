import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Storage } from '@ionic/storage';
import { StorageProvider } from '../../providers/storage/storage';
import { DbProvider } from '../../providers/db/db';
import { AngularFireStorage } from 'angularfire2/storage';

@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {

  product: {} = {}
  authors: string[] = []
  genres: string[] = []
  languages: string[] = ['Uzbek', 'Russian', 'English', 'Foreign']
  bookCover

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public db: AngularFireDatabase,
              public storage: Storage,
              public alertCtrl: AlertController,
              public storeProvider: StorageProvider,
              public dbProvider: DbProvider,
              public cloud: AngularFireStorage
            ){
            }

  ionViewDidLoad() {
    this.getValues()    
    console.log(this.languages)
  }
  add(product){
    product.addedTime = Date.now()
    const filePath = `${product.name}_Cover`
    product.language = product.language.trim()
    product.author = product.author.trim()
    product.genre = product.genre.map(pr=>{
      return pr = pr.trim()
    })
    this.cloud.upload(filePath, this.bookCover).then((data:any)=>{
      product.coverUrl = data.metadata.downloadURLs[0]
      console.log(product)
    }).then((data)=>{
      console.log(product)
      this.db.list('/products/').push(product).then(()=>{
        product = {}
        this.product = {}
      })      
    })    
    
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

  fileUpload(event){
    this.bookCover = event[0]
  }
  getLang(lang){
    console.log('lang is', lang)
  }

}
