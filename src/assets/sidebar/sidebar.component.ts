import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  user:any;

  constructor(protected authService: AuthService) {}

  ngOnInit(): void {
    if(this.authService.isTokenValid()){
      this.authService.user.subscribe(user => {
        this.user = user;
      });
    }
  }



}
