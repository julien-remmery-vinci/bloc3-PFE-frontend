import { Component, OnInit } from "@angular/core";
import { LoadingService } from "../services/loading.service";
import { AuthService } from "../services/auth.service";
import { HighchartsChartModule } from "highcharts-angular";
import { Router, NavigationEnd } from "@angular/router";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  loading: boolean = true;

  spinnerConfig = {
    backdropBorderRadius: "3px",
    animationType: "ball-scale-multiple",
    primaryColour: "#fde791",
    secondaryColour: "#dfd4fb",
    tertiaryColour: "#b5cdbf",
    fullScreen: true,
  };
  constructor(
    private loadingService: LoadingService,
    private authService: AuthService,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateTitle(event.urlAfterRedirects);
        }
    });
    this.authService.loadUserFromServerIfTokenValid();

    this.loadingService.loading$.subscribe((isLoading) => {
      this.loading = isLoading;
    });
  }

  updateTitle(url: string): void {
    let title = 'ShiftingPact';
    if (url.includes('/home')) {
      title = 'Accueil';
    } else if (url.includes('/dashboard')) {
      title = 'Panneau de gestion';
    } else if (url.includes('/statistics')) {
      title = 'Statistiques';
    } else if (url.includes('/register')) {
      title = 'Inscrire utilisateur';
    } else if (url.includes('/login')) {
      title = 'Login';
    } else if (url.includes('/onboarding')) {
      title = 'Onboarding';
    } else if (url.includes('/score')) {
      title = 'Score';
    } else if (url.includes('/userRegister')) {
      title = 'Inscrire utilisateur';
    } else if (url.includes('/companyDashboard')) {
      title = 'Questionnaires';
    } else if (url.includes('/forms/esg/complete')) {
      title = 'Formulaire ESG';
    } else if (url.includes('/forms/esg/validate')) {
      title = 'Valider formulaire ESG';
    } else if (url.includes('/onboarding/validate')) {
      title = 'Valider onboarding';
    } else if (url.includes('/score')) {
      title = 'Modifier le score';
    }
    this.titleService.setTitle(title);
  }
}
