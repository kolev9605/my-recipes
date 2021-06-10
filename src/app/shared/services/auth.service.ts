import { Injectable } from '@angular/core';
import { from, Observable, Subject, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Auth, Hub } from 'aws-amplify';
import { UserSignUp, UserSignIn, ConfirmSignUp } from '../models/user.model';
import { ErrorService } from '../services/error.service';
import { OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  // user: CognitoUserInterface;
  // authState: AuthState;
  userSubject = new Subject<any>();
  x;
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

      console.log(
        'A new auth event has happened: ',
        data.payload.data.username + ' has ' + data.payload.event,
      );
    });
  }

  ngOnDestroy(): void {
    if (this.currentUserSubscription) {
      this.currentUserSubscription.unsubscribe();
    }
  }

  onAuthEvent(payload: any): void {
    console.log('auth state changed onAuthEvent', payload);
    this.userSubject.next(payload.data);
    // ... your implementation
  }

  onSignedOut(payload: any): void {
    console.log('auth state changed onSignedOut', payload);
    this.userSubject.next(null);
    // ... your implementation
  }

  onSignInFailure(payload: any): void {
    console.log('auth state changed onSignInFailure', payload);
    // todo add something that indicates error
    this.userSubject.next(null);
    // ... your implementation
  }

  signUp(user: UserSignUp): Observable<any> {
    return from(
      Auth.signUp({
        username: user.username,
        password: user.password,
        attributes: {
          email: user.email,
        },
      }),
    ).pipe(catchError(this.errorService.handleError));
  }

  signIn(user: UserSignIn): Observable<any> {
    return from(Auth.signIn(user)).pipe(
      catchError(this.errorService.handleError),
    );
  }

  confirmSignUp(confirmSignUp: ConfirmSignUp): Observable<any> {
    return from(
      Auth.confirmSignUp(confirmSignUp.username, confirmSignUp.code),
    ).pipe(catchError(this.errorService.handleError));
  }

  signOut(): Observable<any> {
    return from(Auth.signOut({ global: true })).pipe(
      catchError(this.errorService.handleError),
    );
  }

  tryLogin(): void {
    const currentUser = from(Auth.currentAuthenticatedUser());
    this.currentUserSubscription = currentUser.subscribe(
      (res) => {
        console.log('currentUser', res);
        this.userSubject.next(res);
      },
      (err) => {
        this.userSubject.next(null);
        console.log('current user not found', err);
      },
    );
  }
}
