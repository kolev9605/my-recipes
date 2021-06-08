import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit, OnDestroy {
  isHandset$: Observable<boolean>;
  username = 'none';
  isAuthenticated: boolean;
  signOutSubscription: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private spinnerService: SpinnerService,
    private notificationService: NotificationService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = false;

    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map((result) => result.matches),
      shareReplay(),
    );

    this.signOutSubscription = this.authService.userSubject.subscribe(
      (user) => {
        console.log('subject fired: ', user);
        this.isAuthenticated = !!user;
        if (this.isAuthenticated) {
          this.username = user.username;
        }
      },
    );
  }

  ngOnDestroy(): void {
    this.signOutSubscription.unsubscribe();
  }

  signOut() {
    this.spinnerService.show();

    this.signOutSubscription = this.authService.signOut().subscribe(
      (lougoutResponse) => {
        console.log('logged out!', lougoutResponse);
        this.spinnerService.hide();
        this.router.navigate(['/sign-in']);
      },
      (error) => {
        this.spinnerService.hide();
        this.notificationService.showError(error);
      },
    );
  }
}
