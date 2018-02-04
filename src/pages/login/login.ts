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
    .then((data:any)=>{
      this.userProvider.user = {
        name : data.user.displayName,
        email: data.user.email,
        photo: data.user.photoURL
      }
      console.log(this.userProvider.user)
    })
  }
  facebook(){
    this.auth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then((data:any)=>{
        this.userProvider.user = {
          name : data.user.displayName,
          email: data.user.email,
          photo: data.user.photoURL
        }
        console.log(this.userProvider.user)
      })
      .catch(err=>{
        console.info('error', err)
      })
  }

}
