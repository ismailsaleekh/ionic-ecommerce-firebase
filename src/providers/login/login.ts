import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase'
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Storage } from "@ionic/storage";

@Injectable()

export class LoginProvider {

  public currentUser: any = {}

  private isAuthorized = new BehaviorSubject<boolean>(false)
  public isAuth = this.isAuthorized.asObservable()

  private noUser = new BehaviorSubject<string>('')
  public loginFailed = this.noUser.asObservable()

  constructor(private auth: AngularFireAuth,
              private storage: Storage
  ) { }


  public signInWithSocial(social) {
    this.auth.auth.signInWithRedirect(new firebase.auth[`${social}AuthProvider`]())
      .then((userData: any) => {
        this.setCurrentUser(userData.user)
        this.setUserToStorage()
        this.isAuthorized.next(true)        
      })
  }

  public signInWithEmail(email: string, password: string) {
    this.auth.auth.signInWithEmailAndPassword(email, password)
      .then((userData: any) => {
        this.checkVerification(userData)
      }).catch(() => {
        this.noUser.next('No such user!')
      })
  }

  public logout() {
    this.auth.auth.signOut()
    this.removeUserFromStorage()
    this.isAuthorized.next(false)
  }

  get user() {
    return this.storage.get('userData')
  }

  public registerUserWithEmail(email, password) {
    this.auth.auth.createUserWithEmailAndPassword(email, password)
      .then(data => {
        data.sendEmailVerification()
      })
  }

  private checkVerification(userData) {
    if (userData.emailVerified) {
      this.setCurrentUser(userData)
      this.setUserToStorage()
      this.isAuthorized.next(true)
    } else {
      this.noUser.next('Please, verify your account')
    }
  }

  private setCurrentUser({ displayName, email, photoURL }) {
    this.currentUser.name = displayName
    this.currentUser.email = email
    this.currentUser.photoURL = photoURL
  }

  private removeUserFromStorage() {
    this.storage.remove('userData')
  }

  private setUserToStorage() {
    this.storage.set('userData', this.currentUser)
  }
}