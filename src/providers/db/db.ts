import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Events } from 'ionic-angular';

@Injectable()
export class DbProvider {

  products: any[] = []
  genres: string[] = []
  authors: string[] = []
  uzbBooks: object[] = []
  rusBooks: object[] = []
  engBooks: object[] = []
  foreignBooks: object[] = []
  newestBooks: object[] = []
  constructor(public db: AngularFireDatabase,
              public events: Events
  ) {}
  async fetchProducts(){
    this.db.list('/products/').snapshotChanges().subscribe((data:any)=>{
      data.forEach(product=>{
        let pr = {
          key: product.key,
          name: product.payload.val().name,
          description: product.payload.val().description,
          price: product.payload.val().price,
          addedTime: product.payload.val().addedTime,
          author: product.payload.val().author,
          coverURL: product.payload.val().coverUrl,
          language: product.payload.val().language,
          year: product.payload.val().year,
          genre: product.payload.val().genre
        }
      this.products.push(pr)
      })
      this.getByLang(this.products)
      this.lastAdded(this.newestBooks)
    })
  }

  async fetchGenres(){
    this.genres = []
    this.db.list('/genres/').snapshotChanges().subscribe((data:any)=>{
      data.forEach(element => {
        this.genres.push(element.payload.val().genreName)
      });
      console.log('provider', this.genres)
    })
    return this.genres
  }
  async fetchAuthors(){
    this.authors = []
    this.db.list('/authors/').snapshotChanges().subscribe((data:any)=>{
      data.forEach(element => {
        this.authors.push(element.payload.val().authorName)
      });
    })
    return this.authors
  }

  getByLang(list){
    this.uzbBooks = list.filter(pr=>{
      return pr.language === "Uzbek"
    })
    this.rusBooks = list.filter(pr=>{
      return pr.language === "Russian"
    })
    this.engBooks = list.filter(pr=>{
      return pr.language === "English"
    })
    this.foreignBooks = list.filter(pr=>{
      return pr.language === "Foreign"
    })
    this.events.publish('byLang', this.uzbBooks, this.rusBooks, this.engBooks, this.foreignBooks)
  }

  lastAdded(list){
    list = this.products
    list.sort(this.sortProduct)  
    this.events.publish('lastAdded', list)
  }
  sortProduct(a,b){
    if(a > b) return 1
    if(a < b) return -1
  }
}
