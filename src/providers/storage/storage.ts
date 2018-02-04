import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class StorageProvider {

  genres: string[] = []
  authors: string[] = []
  years: number[] = []

  constructor(public storage: Storage,
              public db: AngularFireDatabase            
  ) {
    for(let i=1980; i < 2018; i++){
      this.years.push(i)
    }
  }

  async setGenres(){
    this.db.list('/genres/').snapshotChanges().subscribe((data:any)=>{
      data.forEach(element => {
        this.genres.push(element.payload.val().genreName)
      })
      this.storage.set('genres', this.genres).catch(err=>{
        console.log('setgenre error', err)
      })
    })
  }
  async setAuthors(){
    this.db.list('/authors/').snapshotChanges().subscribe((data:any)=>{
      data.forEach(element => {
        this.authors.push(element.payload.val().authorName)
      })
      this.storage.set('authors', this.authors).catch(err=>{
        console.log('setauth error', err)
      })
    })
  }
  async setUser(user){
    console.log('user is', user)
    return this.storage.set('user', user)
  }
  async setYear(){
    return this.storage.set('years', this.years)
  }
  async clearStorage(){
    return this.storage.clear()
  }
}
