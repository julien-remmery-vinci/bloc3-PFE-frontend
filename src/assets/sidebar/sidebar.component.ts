import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Corriger le chemin d'importation

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(public authService: AuthService) {}
}