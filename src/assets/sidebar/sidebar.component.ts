import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import { ThemeService } from 'src/app/theme/theme.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  user:any;

  constructor(protected authService: AuthService, private themeService: ThemeService) {}

  ngOnInit(): void {
    if(this.authService.isTokenValid()){
      this.authService.user.subscribe(user => {
        this.user = user;
      });
    }
  }
  toggleDarkMode(): void {
    this.themeService.toggleDarkMode();
  }

  isDarkMode(): boolean {
    return this.themeService.isDarkModeEnabled();
  }
}
