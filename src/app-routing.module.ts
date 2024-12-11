import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {LoginComponent} from "./pages/login/login.component";
import {FormsOddCompleteComponent} from "./pages/forms-odd-complete/forms-odd-complete.component";
import {FormsEsgCompleteComponent} from "./pages/forms-esg-complete/forms-esg-complete.component";
import {FormsEsgValidateComponent} from "./pages/forms-esg-validate/forms-esg-validate.component";
import {FormsComponent} from "./pages/forms/forms.component";
import {AuthGuard} from "./guard/auth.guard";
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { CompanyDashboardComponent } from './pages/company-dashboard/company-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],data: { role: 'admin' } },
  { path: 'login', component: LoginComponent },
  { path: 'forms', component: FormsComponent, canActivate: [AuthGuard] },
  { path: 'forms/esg/complete', component: FormsEsgCompleteComponent, canActivate: [AuthGuard] },
  { path: 'forms/odd/complete', component: FormsOddCompleteComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
  { path: 'userRegister', component: UserRegisterComponent, canActivate: [AuthGuard], data: { role: 'user' } },
  { path: 'companyDashboard', component: CompanyDashboardComponent, canActivate: [AuthGuard], data: { role: 'user' } },
  { path: 'forms/esg/validate', component: FormsEsgValidateComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
