import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Events } from 'ionic-angular';

@Injectable()
export class DbProvider {

  products: any[] = []
  newestBooks: object[] = []
  genres: any[] = []
  authors: any[] = []

  constructor(public db: AngularFireDatabase,
    public events: Events
  ) {
    this.fetchGenres()
    this.fetchAuthors()
   }

  async fetchProducts() {
    if (this.products.length > 0) {
      return this.products
    } else {
      await this.db.list('/products/').snapshotChanges().subscribe((data: any) => {
        data.forEach(product => {
          const pr = product.payload.val()
          pr.key = product.key
          this.products.push(pr)
        })
        this.sortProducts(this.products)
      })
      return this.products        
    } 
  }

  async fetchGenres() {
    if (this.genres.length > 0) {
      return this.genres
    } else {
        const genres = []
        await this.db.list('/genres/').snapshotChanges().subscribe((data: any) => {
          data.forEach(element => {
            genres.push(element.payload.val())
          });
        })
        this.genres = genres
        return genres
      }
  }

  async fetchAuthors() {
    if (this.authors.length > 0) {
      return this.authors
    } else {
      const authors = []
    await this.db.list('/authors/').snapshotChanges().subscribe((data: any) => {
      data.forEach(element => {
        authors.push(element.payload.val())
      });
    })
    this.authors = authors

    return authors
    }   
    
  }

  sortProducts(list) {
    const uzbBooks = list.filter(pr => {
      return pr.language === "Uzbek"
    })
    const rusBooks = list.filter(pr => {
      return pr.language === "Russian"
    })
    const engBooks = list.filter(pr => {
      return pr.language === "English"
    })
    const foreignBooks = list.filter(pr => {
      return pr.language === "Foreign"
    })
    const lastAdded = list
    lastAdded.sort(this.comparisor)
    this.events.publish('sortedProducts', { uzbBooks, rusBooks, engBooks, foreignBooks, lastAdded })
  }

  comparisor(a, b) {
    if (a > b) return 1
    if (a < b) return -1
  }

  checkout(product) {
    this.db.list('/checkout/').push(product)
  }
}
