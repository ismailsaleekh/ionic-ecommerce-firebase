import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user: {} = {}

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public storage: Storage,
              public auth: AngularFireAuth
            ) {}

  ionViewDidLoad() {
    this.isAuth()
  }
  logout(){
    this.auth.auth.signOut().then(data=>{
      this.storage.set('user', null)
    })
    this.isAuth()
  }
  isAuth(){
    this.storage.get('user').then((data: any)=>{
      if(data) this.user = data
      else this.navCtrl.push(LoginPage)
    })
  }
}
