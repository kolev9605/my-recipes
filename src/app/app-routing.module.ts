import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { RecipesComponent } from './recipes/recipes.component';
import { TestComponent } from './test/test.component';
import { AuthGuard } from './shared/services/auth-guard';

const routes: Routes = [
  { path: '', component: TestComponent },
  { path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard] },
  { path: 'sign-in', component: AuthComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
