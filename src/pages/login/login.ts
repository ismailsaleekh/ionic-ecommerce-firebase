import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  message: string = ''
  user: any = {}

  constructor(public navCtrl: NavController,
    public loginProvider: LoginProvider,
    private modalCtrl: ModalController
  ) {
    loginProvider.isAuth.subscribe(data => {
      if (data) {
        navCtrl.push(HomePage)
      }
    })
  }

  ionViewDidLoad() {
    this.loginProvider.loginFailed.subscribe(data => {
      if (data) {
        this.message = data
      } else {
        this.message = ''
      }
    })
  }

  showModal() {
    let modal = this.modalCtrl.create(RegisterPage)
    modal.present()
  }
}
