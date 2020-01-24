import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from '../Models/auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /* etat par defaut d'un user  */
  isAuthenticated = false;
  /*token pour accés ou pas a une route*/
  private token: string;
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
    this.httpClient.post<{token: string}>('http://localhost:3000/api/user/login', authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.router.navigate(['/']);
        }
      });
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
  }
}
