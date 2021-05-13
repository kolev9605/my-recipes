import { Injectable } from '@angular/core';
import { from, Observable, Subject, Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Auth, Hub } from 'aws-amplify';
import { UserSignUp, UserSignIn, ConfirmSignUp } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';
import { ErrorService } from '../services/error.service';
import { OnDestroy } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  // user: CognitoUserInterface;
  // authState: AuthState;
  userSubject = new Subject<any>();
  currentUserSubscription: Subscription;

  constructor(private errorService: ErrorService) {
    Hub.listen('auth', (data) => {
      const { payload } = data;

      console.log('event:', payload.event);
      switch (payload.event) {
        case 'signIn':
          console.log('user signed in');
          this.onAuthEvent(payload);
          break;
        case 'signUp':
          console.log('user signed up');
          this.onAuthEvent(payload);
          break;
        case 'signOut':
          console.log('user signed out');
          this.onSignedOut(payload);
          break;
        case 'signIn_failure':
          console.log('user sign in failed');
          this.onSignInFailure(payload);
          break;
        // case 'configured':
        //   console.log('the Auth module is configured');
        //   break;
      }

      console.log('A new auth event has happened: ', data.payload.data.username + ' has ' + data.payload.event);
    });
  }

  ngOnDestroy(): void {
    if (this.currentUserSubscription) {
      this.currentUserSubscription.unsubscribe();
    }
  }

  onAuthEvent(payload): void {
    console.log('auth state changed', payload);
    this.userSubject.next(payload.data);
    // ... your implementation
  }

  onSignedOut(payload): void {
    console.log('auth state changed', payload);
    this.userSubject.next(null);
    // ... your implementation
  }

  onSignInFailure(payload): void {
    console.log('auth state changed', payload);
    // todo add something that indicates error
    this.userSubject.next(null);
    // ... your implementation
  }

  signUp(user: UserSignUp): Observable<any> {
    const signUpObservable = from(Auth.signUp({
      username: user.username,
      password: user.password,
      attributes: {
        email: user.email,
      }
    })).pipe(
      catchError(this.errorService.handleError)
    );

    return signUpObservable;
  }

  signIn(user: UserSignIn): Observable<any> {
    const signInObservable = from(Auth.signIn(user)).pipe(
      catchError(this.errorService.handleError)
    );

    return signInObservable;
  }

  confirmSignUp(confirmSignUp: ConfirmSignUp) {
    const confirmSignUpObservable = from(Auth.confirmSignUp(confirmSignUp.username, confirmSignUp.code)).pipe(
      catchError(this.errorService.handleError)
    );

    return confirmSignUpObservable;
  }

  signOut() {
    const signOutObservable = from(Auth.signOut({ global: true })).pipe(
      catchError(this.errorService.handleError)
    );

    return signOutObservable;
  }

  tryLogin() {
    // const currentUser = await Auth.currentAuthenticatedUser();
    // console.log('user++', currentUser);

    // if (currentUser) {
    //   this.userSubject.next(currentUser);
    // } else {
    //   this.userSubject.next(null);
    // }
    // Auth.currentAuthenticatedUser({
    //   bypassCache: false
    // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    // }).then(user => {
    //   console.log('currentUser', user);
    //   this.userSubject.next(user);
    // })
    //   .catch(err => {
    //     this.userSubject.next(null);
    //     console.log('current user not found', err)
    //   });

    const currentUser = from(Auth.currentAuthenticatedUser());
    this.currentUserSubscription = currentUser.subscribe(res => {
      console.log('currentUser', res);
      this.userSubject.next(res);
    },
      err => {
        this.userSubject.next(null);
        console.log('current user not found', err);
      });
  }
}
