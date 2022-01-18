import { Router } from '@angular/router';
import { User } from '../models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject,Observable } from "rxjs";
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _connexionUrl = "http://127.0.0.1:8000/login_check"

  private _getUrl = "http://127.0.0.1:8000"

  private userSubject: BehaviorSubject<User>;

  public user: Observable<User>;

  public loggedUser:string ="";
  public isloggedIn: Boolean = false;
  public roles:any;


  constructor(private http:HttpClient, public jwtHelper: JwtHelperService, private router: Router) { 

    this.userSubject = new BehaviorSubject<User>(
      
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.user = this.userSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.userSubject.value;
  }

  login(user:any) {
    return this.http.post<any>(this._connexionUrl, user)
      .pipe(
        map(user => { 
          // login successful if there's a jwt token in the response
          if (user && user.token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
             // this.InfosSave(user.token);
              this.userSubject.next(user);
          } 

          return user;
      }));
    }
    private getUrl = "http://127.0.0.1:8000/api"

    users = this.http.get<any>(this.getUrl +'/users')

    SignIn(user :User):Boolean{
      let validUser: Boolean = false;
      this.users.forEach((curUser:any) => {
        if(user.username=== curUser.username && user.password==curUser.password) {
          validUser = true;
          this.loggedUser = curUser.username;
          this.isloggedIn = true;
          this.roles = curUser.roles;
          localStorage.setItem('loggedUser',this.loggedUser);
          localStorage.setItem('isloggedIn',String(this.isloggedIn));
        }
      });
  
       return validUser;
    }

    isAdmin():Boolean{
      if (!this.roles) //this.roles== undefiened
         return false;
      return (this.roles.indexOf('ROLE_PP') >-1);
    }

  connexionUser(user:any){
   return this.http.post<any>(this._connexionUrl, user)
  }

  getToken(){
    return localStorage.getItem('token')
  }


  logout(){
    localStorage.clear();
   // this.userSubject.next(null);
    this.router.navigate(['/connexion'])
   
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
   if(token){
     return true;
   }else{
     return false
   }
  }

 
}
 