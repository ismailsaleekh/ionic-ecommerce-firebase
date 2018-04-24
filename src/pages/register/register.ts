import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user: any = {}
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private loginProvider: LoginProvider
  ) { }

  ionViewDidLoad() {

  }

  showAlert() {
    this.loginProvider.registerUserWithEmail(this.user.email, this.user.password)

    let alert = this.alertCtrl.create({
      title: 'Registration completed!',
      subTitle: `Confirmation letter was sent to ${this.user.email}`,
      buttons: ['Ok']
    })
    alert.present()

    this.navCtrl.setRoot(LoginPage)
  }
}
