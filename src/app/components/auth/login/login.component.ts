import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
   /* souscription au status authstatuslistener si oui ou non on est authentifier  */
   private authListenerLoginSubs: Subscription;
   constructor(public authService: AuthService) { }

   ngOnInit() {
     this.authListenerLoginSubs = this.authService.getauthStatusListener().subscribe(
       authStatus => {
         this.isLoading = false;
       }
     );
   }
   ngOnDestroy() {
    this.authListenerLoginSubs.unsubscribe();
}

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password);

  }

}
