import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FantomeDetailComponent } from './components/fantome-detail/fantome-detail.component';
import { HomeComponent } from './components/home/home.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
  path: 'login',
  component: LoginPageComponent,
  },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
  { path: 'dashboard', component: DashboardComponent,
  canActivate: [AuthGuard], },
  { path: 'detail/:id', component: FantomeDetailComponent,
  canActivate: [AuthGuard], },
  { path: 'fantomes', component: HomeComponent,
  canActivate: [AuthGuard], }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
