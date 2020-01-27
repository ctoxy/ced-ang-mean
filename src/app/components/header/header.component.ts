import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  /* etat par defaut d'un user  */
  userIsAuthenticated = false;
  /* souscription au status authstatuslistener si oui ou non on est authentifier  */
  private authListenerHeaderSubs: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerHeaderSubs = this.authService
      .getauthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }
  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerHeaderSubs.unsubscribe();
  }

}
