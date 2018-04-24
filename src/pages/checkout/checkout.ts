import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {

  user: any = {}
  totalSum: number = 0

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private auth: AngularFireAuth,
              private viewCtrl: ViewController
) { }

  ionViewDidLoad() {
    this.totalSum = this.navParams.get('totalSum')
    this.auth.authState.subscribe(data => {
      if (data) {
        this.user.name = data.displayName
        this.user.email = data.email
        console.log(this.user)
      } else {
        this.navCtrl.push(LoginPage)
      }
    })
  }

  checkout() {
    this.viewCtrl.dismiss(this.user)
  }

}
