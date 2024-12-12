import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {LoginComponent} from "./pages/login/login.component";
import {FormsEsgCompleteComponent} from "./pages/forms-esg-complete/forms-esg-complete.component";
import {FormsEsgValidateComponent} from "./pages/forms-esg-validate/forms-esg-validate.component";
import {AuthGuard} from "./guard/auth.guard";
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { OnboardingComponent } from './pages/onboarding/onboarding.component';
import { CompanyDashboardComponent } from './pages/company-dashboard/company-dashboard.component';
import { ScoreComponent } from './pages/score/score.component';
import { ScoreReviewComponent } from './pages/scoreReview/scoreReview.component';
import {OnboardingValidationComponent} from "./pages/onboarding-validation/onboarding-validation.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],data: { role: 'admin' } },
  { path: 'onboarding', component: OnboardingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'userRegister', component: UserRegisterComponent, canActivate: [AuthGuard], data: { role: 'user' } },
  { path: 'companyDashboard', component: CompanyDashboardComponent, canActivate: [AuthGuard], data: { role: 'user' } },
  { path: 'forms/esg/complete', component: FormsEsgCompleteComponent, canActivate: [AuthGuard], data: { role: 'user' } },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],data: { role: 'admin' } },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
  { path: 'forms/esg/validate', component: FormsEsgValidateComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
  { path: 'score',component: ScoreComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
  { path: 'forms/score',component: ScoreReviewComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
  { path: 'onboarding/validate',component: OnboardingValidationComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
  { path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
  { path: 'score',component: ScoreComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
