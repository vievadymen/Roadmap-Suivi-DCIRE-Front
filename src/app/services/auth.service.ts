import { Router } from '@angular/router';
import { User } from '../models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject,Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Role } from '../models/role';
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
  public roles:string[]=[];

  

  constructor(private http:HttpClient, public jwtHelper: JwtHelperService, private router: Router) { 

    this.userSubject = new BehaviorSubject<User>(
      
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.user = this.userSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(this._connexionUrl, {username,password})
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
              
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.InfosSave(user.token);
              this.userSubject.next(user);
          } 

          return user;
      }));
      //   map(() => {
      //     let user: User = {
      //       username: username,
      //       passwword: password,
      //     };
      //     localStorage.setItem('currentUser', JSON.stringify(user));
      //     this.userSubject.next(user);
      //     return user;
      //   })
      // );
    }

   InfosSave(token: any){
    let from : any= jwt_decode(token);
     localStorage.set({key: 'token', value: token});
    //await localStorage.set({key: 'id', value: from['id']});
     localStorage.set({key: 'role', value: from['roles']});
     localStorage.set({key: 'username', value: from['usernane']});     

 }

  connexionUser(user:any){
   return this.http.post<any>(this._connexionUrl, user)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  logout(){
    localStorage.removeItem('token');
   // this.userSubject.next(null);
    this.router.navigate(['/connexion'])
   
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return (!!token);
  }

 
}
 