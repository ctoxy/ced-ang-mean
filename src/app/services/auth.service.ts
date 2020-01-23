import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from '../Models/auth-data.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /*token pour accés ou pas a une route*/
  private token: string;

  constructor(private httpClient: HttpClient) {

  }

  /*token etant privé methode permettant de l'utiliser dans le post service */
  getToken() {
    return this.token;
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
      });
  }
}
