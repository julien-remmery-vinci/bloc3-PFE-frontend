import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {User} from "../types/User";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  currentUser: User | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    this.authService.getUser().subscribe(user => {
      this.currentUser = user;
    });

    if (this.authService.isTokenValid()) {
      if (this.currentUser) {
        if (route.data['role'] && route.data['role'] !== this.currentUser.role) {
          this.router.navigate(['/forms']);
          return false;
        }
        return true;
      }
    } else {
      this.router.navigate(['/login']);
      console.log("not logged");
      return false;
    }
    return false
  }

}
