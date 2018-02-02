import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageProvider {

  genres: string[] = ['fantastic', 'advanture', 'action', 'humor', 'thriller', 'horror']
  authors: string[] = ['author1', 'author2', 'author3', 'author4', 'author5', 'author6']
  years: number[] = []

  constructor(public storage: Storage) {
    for(let i=1980; i < 2018; i++){
      this.years.push(i)
    }
  }

  async setGenres(){
    return this.storage.set('genres', this.genres)
  }
  async setAuthors(){
    return this.storage.set('authors', this.authors)
  }
  async setUser(user){
    return this.storage.set('user', user)
  }
  async setYear(){
    return this.storage.set('years', this.years)
  }
}
