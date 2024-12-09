import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public isDarkMode = false;

  constructor() {
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
    this.applyTheme();
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode.toString());
    this.applyTheme();
  }

  private applyTheme(): void {
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  isDarkModeEnabled(): boolean {
    return this.isDarkMode;
  }
}
