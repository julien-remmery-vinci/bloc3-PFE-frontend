import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app/app.component";
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { LoginComponent } from "./pages/login/login.component";
import { BrowserModule } from "@angular/platform-browser";
import { SidebarComponent } from "./assets/sidebar/sidebar.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { HttpInterceptorService } from "./services/http.interceptor";
import { AuthGuard } from "./guard/auth.guard";
import { NgxLoadingModule } from "ngx-loading";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { NgOptimizedImage, CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { HomeComponent } from "./pages/home/home.component";
import { RegisterComponent } from "./pages/register/register.component";
import { AnimatedButtonComponent } from "./assets/animated-button/animated-button.component";
import { MatIconModule } from "@angular/material/icon";
import { ThemeService } from "./app/theme/theme.service";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatCardModule } from '@angular/material/card';
import { UserRegisterComponent } from "./pages/user-register/user-register.component";
import { HighchartsChartModule } from "highcharts-angular";
import { StatisticsComponent } from "./pages/statistics/statistics.component";
import { OnboardingComponent } from "./pages/onboarding/onboarding.component";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    SidebarComponent,
    HomeComponent,
    RegisterComponent,
    UserRegisterComponent,
    StatisticsComponent,
    OnboardingComponent
  ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxLoadingModule.forRoot({}),
    BrowserAnimationsModule,
    MatButtonModule,
    NgOptimizedImage,
    CommonModule,
    ReactiveFormsModule,
    AnimatedButtonComponent,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    HighchartsChartModule,
  ],
  providers: [
    ThemeService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
