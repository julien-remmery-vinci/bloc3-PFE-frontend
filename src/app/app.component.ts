import {Component, OnInit} from '@angular/core';
import {LoadingService} from "../services/loading.service";
import {AuthService} from "../services/auth.service";
import { HighchartsChartModule } from 'highcharts-angular';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loading: boolean = true;

  spinnerConfig = {
    backdropBorderRadius: '3px',
    animationType: 'ball-scale-multiple',
    primaryColour: '#fde791',
    secondaryColour: '#dfd4fb',
    tertiaryColour: '#b5cdbf',
    fullScreen: true
  };
    constructor(private loadingService: LoadingService,private authService: AuthService, private router: Router) {}

    ngOnInit() {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          console.log('Current route:', event.urlAfterRedirects);
        }
      });
      this.authService.loadUserFromServerIfTokenValid()

      this.loadingService.loading$.subscribe(isLoading => {
        this.loading = isLoading;
      });
    }
}
