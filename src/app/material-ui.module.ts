import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  imports: [
    MatButtonModule,
    MatGridListModule,
    LayoutModule,
  ],
  exports: [
    MatButtonModule,
    MatGridListModule,
    LayoutModule,
  ]
})
export class MaterialUiModule { }
