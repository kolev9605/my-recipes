import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.userSubject.pipe(
      take(1),
      exhaustMap(user => {
        if(!user) {
          return next.handle(req);
        }

        const modifiedRequest = req.clone({
          // setHeaders: {
          //   Authorization: `Bearer ${user.token}`
          // }
        });

        return next.handle(modifiedRequest);
      })
    );
  }
}
