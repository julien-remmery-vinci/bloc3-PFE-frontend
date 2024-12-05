import {Component, OnInit} from '@angular/core';
import {LoadingService} from "../services/loading.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loading: boolean = false;

  spinnerConfig = {
    backdropBorderRadius: '3px',
    animationType: 'ball-scale-multiple',
    primaryColour: '#fde791',
    secondaryColour: '#dfd4fb',
    tertiaryColour: '#b5cdbf',
    fullScreen: true
  };
    constructor(private loadingService: LoadingService) {}

    ngOnInit() {
      this.loadingService.loading$.subscribe(isLoading => {
        this.loading = isLoading;
      });
    }
}
