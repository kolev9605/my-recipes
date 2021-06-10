import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/* Add Amplify imports */
// import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialUiModule } from './material-ui.module';
import { RecipesComponent } from './recipes/recipes.component';
import { AppRoutingModule } from './app-routing.module';
import { GridDirective } from './shared/grid.directive';
import { TestComponent } from './test/test.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { AuthComponent } from './auth/auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProgressSpinnerComponent } from './shared/components/progress-spinner/progress-spinner.component';
import { OverlayModule, OverlayRef } from '@angular/cdk/overlay';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/services/auth.interceptor';

/* Configure Amplify resources */
Amplify.configure(awsconfig);

@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    GridDirective,
    TestComponent,
    NavigationComponent,
    AuthComponent,
    ProgressSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialUiModule,
    AppRoutingModule,
    // AmplifyUIAngularModule,
    ReactiveFormsModule,
    OverlayModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ProgressSpinnerComponent],
})
export class AppModule {}
