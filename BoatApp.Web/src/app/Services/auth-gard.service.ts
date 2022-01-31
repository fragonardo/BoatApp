import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGardService implements CanActivate  {

  constructor(
    private router: Router,
    private authService: AuthenticationService) { }
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      let currentUser = this.authService.CurrentUser;
      if (currentUser) {
        if (route.data['Roles']){
          for (let i = 0; i < route.data['Roles'].length; i++)
          { 
            if (currentUser.roles.includes(route.data['Roles'][i])) {
              return true;
            }
          }
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
          return false;
        }
        return true;
      }

      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
  }
}
