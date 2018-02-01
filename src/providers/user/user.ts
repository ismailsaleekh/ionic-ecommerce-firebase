import { Injectable } from '@angular/core';

@Injectable()
export class UserProvider {

  user: {
    name: string,
    email: string,
    photo
  }

  constructor() {
    console.log('Hello UserProvider Provider');
  }


}
