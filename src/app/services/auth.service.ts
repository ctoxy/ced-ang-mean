import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from '../Models/auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { expressionType } from '@angular/compiler/src/output/output_ast';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /* etat par defaut d'un user  */
  private isAuthenticated = false;
  /* pemet de savoir qui a creer le poste pour autoriser ou non update et delete  */
  private userId: string;
  /*token pour accés ou pas a une route*/
  private token: string;
  /*tokenTimer issue du back pour une raz lors du logout*/
  private tokenTimer: any;
  /*SUBJECT permet de transmettre a un composant le status de l'authentification ex header*/
  private authStatusListener = new Subject<boolean>();

  constructor(private httpClient: HttpClient, private router: Router) {

  }

  /*token etant privé methode permettant de l'utiliser dans le post service */
  getToken() {
    return this.token;
  }
  /*status vrai ou faux si on est ou pas authentifier apres le login*/
  getIsAuth() {
    return this.isAuthenticated;
  }
  /*envoi le status du createur du post*/
  getUserId() {
    return this.userId;
  }
  /*status vrai ou faux si on est ou pas authentifier de maniere générale*/
  getauthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.httpClient.post('http://localhost:3000/api/user/signup', authData)
      .subscribe(response => {
        console.log(response);
      });
  }

  login(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.httpClient.post<{token: string, expiresIn: number, userId: string}>('http://localhost:3000/api/user/login', authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          /* expiration du token backend expiredIn mise sur 3600 on fait *1000 pour une heure*/
          const expirationInDuration = response.expiresIn;
          this.setAuthTimer(expirationInDuration);
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expirationInDuration * 1000);
          console.log(expirationDate);

          this.saveAuthData(token, expirationDate, this.userId);
          this.router.navigate(['/']);
        }
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();

    this.router.navigate(['/']);

  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
  /* utilisation du localstorage pour premunir du rechargement de page et conserver le token en front */
  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    };
  }
}
