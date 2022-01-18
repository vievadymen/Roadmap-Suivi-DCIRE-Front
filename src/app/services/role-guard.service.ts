import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
import jwt_decode from 'jwt-decode';
import { JwtHelperService } from "@auth0/angular-jwt";



@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate{

  constructor(public auth: AuthService, public router: Router) { }



  canActivate(route: ActivatedRouteSnapshot): boolean {
       // this will be passed from the route config
   
    const role = localStorage.getItem('roles');

    console.log(role);
    
    // decode the token to get its payload
    if (!this.auth.isAuthenticated() || role !== "ROLE_PP"
    ) {
      this.router.navigate(['/connexion']);
      return false;
    }
    return true;
  }

}
