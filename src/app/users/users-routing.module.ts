import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { RegisterComponent } from './register.component';
import { SignInComponent } from './sign-in.component';

const routes: Routes = [
  { path: 'signin', component: SignInComponent, data: { title: extract('SignIn') } },
  { path: 'register', component: RegisterComponent, data: { title: extract('Register') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class UsersRoutingModule { }
