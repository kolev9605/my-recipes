import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { CognitoUserInterface, AuthState } from "@aws-amplify/ui-components";
import { Observable, Subject, Subscription, SubscriptionLike } from 'rxjs';

import { AuthService } from '../shared/services/auth.service';
import { SpinnerService } from '../shared/services/spinner.service';
import { NotificationService } from '../shared/services/notification.service';
import {
  ConfirmSignUp,
  UserSignIn,
  UserSignUp,
} from '../shared/models/user.model';
import { Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  form: FormGroup;
  formType: string;

  signInSubscription: Subscription;
  signUpSubscription: SubscriptionLike;
  confirmSignUpSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private spinnerService: SpinnerService,
    private notificationService: NotificationService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.formType = 'signIn';

    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
      email: ['', null],
      code: ['', null],
    });
  }

  ngOnDestroy(): void {
    if (this.signInSubscription) {
      this.signInSubscription.unsubscribe();
    }

    if (this.signUpSubscription) {
      this.signUpSubscription.unsubscribe();
    }

    if (this.confirmSignUpSubscription) {
      this.confirmSignUpSubscription.unsubscribe();
    }
  }

  onSubmit(): void {
    switch (this.formType) {
      case 'signUp':
        this.signUp();
        break;
      case 'signIn':
        this.signIn();
        break;
      case 'confirmSignUp':
        this.confirmSignUp();
        break;
    }
  }

  signIn() {
    this.spinnerService.show();

    const userSignIn: UserSignIn = new UserSignIn(
      this.form.value.username,
      this.form.value.password,
    );
    this.signInSubscription = this.authService.signIn(userSignIn).subscribe(
      (authResponse) => {
        console.log('signed in!', authResponse);
        this.spinnerService.hide();
        this.router.navigate(['/recipes']);
      },
      (error) => {
        this.spinnerService.hide();
        this.notificationService.showError(error);
      },
    );
  }

  signUp() {
    this.spinnerService.show();

    const userSignUp: UserSignUp = new UserSignUp(
      this.form.value.username,
      this.form.value.password,
      this.form.value.email,
    );
    this.signUpSubscription = this.authService.signUp(userSignUp).subscribe(
      (authResponse) => {
        this.formType = 'confirmSignUp';
        console.log('signed up!', authResponse);
        this.spinnerService.hide();
      },
      (error) => {
        this.spinnerService.hide();
        this.notificationService.showError(error);
      },
    );
  }

  confirmSignUp() {
    this.spinnerService.show();

    const confirmSignUp = new ConfirmSignUp(
      this.form.value.code,
      this.form.value.username,
    );
    this.confirmSignUpSubscription = this.authService
      .confirmSignUp(confirmSignUp)
      .subscribe(
        (confirirmResponse) => {
          console.log('confirmed!', confirirmResponse);
          this.spinnerService.hide();
          this.router.navigate(['/recipes']);
        },
        (error) => {
          this.spinnerService.hide();
          this.notificationService.showError(error);
        },
      );
  }

  authModeChanged($event: MatTabChangeEvent) {
    this.formType = $event.tab.textLabel;

    console.log($event);
  }
}
