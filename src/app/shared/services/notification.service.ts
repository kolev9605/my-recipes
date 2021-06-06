import { Injectable } from '@angular/core';
import Toastify from 'toastify-js';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() {
  }

  showError(message:string) {
    Toastify({
      text: message,
      duration: 4000,
      close: true,
      backgroundColor: 'linear-gradient(to right, #FA8072, #E9967A)',
      stopOnFocus: true,
    }).showToast();
  }

  showSuccess(message:string) {
    Toastify({
      text: message,
      duration: 4000,
      close: true,
      stopOnFocus: true
    }).showToast();
  }
}
