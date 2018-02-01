import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { UserProvider } from '../../providers/user/user';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public auth: AngularFireAuth,
              public userProvider: UserProvider
            ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  google(){
    this.auth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
      .then(({name: displayName, email: email, photoURL: photo})=>{
        console.log(name, email, photo)
        this.userProvider.user = {
          name, email, photo
        }
        console.log(this.userProvider.user)
      })
  }

}
