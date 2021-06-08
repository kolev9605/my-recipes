import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  public handleError(errorResponse: HttpErrorResponse) {
    console.log('subscription error: ', errorResponse);
    let errorMessage;
    if (!errorResponse.message) {
      errorMessage = 'Something went wrong :/';
    } else {
      errorMessage = errorResponse.message;
    }

    return throwError(errorMessage);
  }
}
