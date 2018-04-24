import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { IonicStorageModule } from "@ionic/storage";
import { AngularFireStorageModule } from "angularfire2/storage";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { CartPage } from '../pages/cart/cart';
import { ProfilePage } from '../pages/profile/profile';
import { CartProvider } from '../providers/cart/cart';
import { LoginPage } from '../pages/login/login';
import { DbProvider } from '../providers/db/db';
import { ProductPage } from '../pages/product/product';
import { LoginProvider } from '../providers/login/login';
import { FavoritesProvider } from '../providers/favorites/favorites';
import { TypeListPage } from '../pages/type-list/type-list';
import { FavoritesPage } from '../pages/favorites/favorites';
import { RegisterPage } from '../pages/register/register';
import { CheckoutPage } from '../pages/checkout/checkout';

const firebaseConfig = {
  apiKey: "AIzaSyARGzZ4hTAQQQ8bD4sZjuarzyawVPlRXAY",
  authDomain: "dimploma-project.firebaseapp.com",
  databaseURL: "https://dimploma-project.firebaseio.com",
  projectId: "dimploma-project",
  storageBucket: "dimploma-project.appspot.com",
  messagingSenderId: "752633795001"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    TabsPage,
    CartPage,
    ProfilePage,
    LoginPage,
    ProductPage,
    TypeListPage,
    FavoritesPage,
    RegisterPage,
    CheckoutPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot(),
    AngularFireStorageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    TabsPage,
    CartPage,
    ProfilePage,
    LoginPage,
    ProductPage,
    TypeListPage,
    FavoritesPage,
    RegisterPage,
    CheckoutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CartProvider,
    DbProvider,
    LoginProvider,
    FavoritesProvider,
  ]
})
export class AppModule { }
