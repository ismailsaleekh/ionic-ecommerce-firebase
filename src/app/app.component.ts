import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { CartPage } from '../pages/cart/cart';
import { TypeListPage } from '../pages/type-list/type-list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = TabsPage;

  pages: Array<{ title: string, component: any, icon: string }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: TabsPage, icon: 'home' },
      { title: 'Cart', component: CartPage, icon: 'cart' },
      { title: 'Genres', component: TypeListPage, icon: 'list-box' },
      { title: 'Authors', component: TypeListPage, icon: 'contacts' },
      { title: 'About', component: TabsPage, icon: 'information-circle' }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    if (page.title === 'Genres' || page.title === "Authors") {
      this.nav.setRoot(page.component, { type: page.title });
    } else {
      this.nav.setRoot(page.component)
    }
  }
}
