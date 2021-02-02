import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialUiModule } from './material-ui.module';
import { RecipesComponent } from './recipes/recipes.component';
import { AppRoutingModule } from './app-routing.module';
import { GridDirective } from './shared/grid.directive';
import { TestComponent } from './test/test.component';
import { NavigationComponent } from './layout/navigation/navigation.component';


@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    GridDirective,
    TestComponent,
    NavigationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialUiModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
