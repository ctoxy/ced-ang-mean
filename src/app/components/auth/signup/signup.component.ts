import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  isLoading = false;
  /* souscription au status authstatuslistener si oui ou non on est authentifier  */
  private authListenerSignUpSubs: Subscription;
  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authListenerSignUpSubs = this.authService.getauthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.createUser(form.value.email, form.value.password);
    this.router.navigate(['/']);

  }
  ngOnDestroy() {
      this.authListenerSignUpSubs.unsubscribe();
  }

}
