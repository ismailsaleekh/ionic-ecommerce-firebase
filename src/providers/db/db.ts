import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the DbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DbProvider {

  products: any[] = []
  genres: string[] = []
  authors: string[] = []

  constructor(public db: AngularFireDatabase) {}

  async fetchProducts(){
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
    })
  }

  async fetchGenres(){
    this.genres = []
    this.db.list('/genres/').snapshotChanges().subscribe((data:any)=>{
      data.forEach(element => {
        this.genres.push(element.payload.val().genreName)
      });
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

}
