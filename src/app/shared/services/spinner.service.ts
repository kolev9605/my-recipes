import { Injectable } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ProgressSpinnerComponent } from '../components/progress-spinner/progress-spinner.component';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  overlayContainer;

  constructor(private overlay: Overlay) {
    this.overlayContainer = this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      hasBackdrop: true,
    });
  }

  show() {
    this.overlayContainer.attach(new ComponentPortal(ProgressSpinnerComponent));
  }

  hide() {
    this.overlayContainer.detach();
  }
}
