import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { CartPage } from '../cart/cart';
import { FavoritesPage } from '../favorites/favorites';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user: any = {}

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public auth: AngularFireAuth
  ) { }

  ionViewDidLoad() {
    this.isAuth()
  }
  logout() {
    this.auth.auth.signOut().then(data => {
      this.storage.set('user', null)
    })
    this.isAuth()
  }
  isAuth() {
    this.auth.authState.subscribe((data) => {
      if (data) {
        const { displayName, email, photoURL } = data
        this.user.name = displayName
        this.user.email = email
        this.user.photoUrl = photoURL
      }
    })
  }

  goTo(page: string) {
    if (page === 'Cart') {
      this.navCtrl.push(CartPage)
    }
    else if (page === 'Favorites') {
      this.navCtrl.push(FavoritesPage)
    }
  }
}
