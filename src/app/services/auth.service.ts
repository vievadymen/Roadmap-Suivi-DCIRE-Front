import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _connexionUrl = "http://127.0.0.1:8000/api/login_check"

  private _getUrl = "http://127.0.0.1:8000/api"

  constructor(private http:HttpClient) { }

  connexionUser(user:any){

   return this.http.post<any>(this._connexionUrl, user)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  getUsers(){
    return this.http.get<any>(this._getUrl +'/admin/users')
  }
}
 