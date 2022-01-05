import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private getUrl = "http://127.0.0.1:8000/api"
  constructor(private http:HttpClient, private _auth:AuthService,private _router:Router) { }

  postUsers(user:any){
    return this.http.post<any>(this.getUrl +'/users', user)
  }

  users = this.http.get<any>(this.getUrl +'/users')


  getUsers(){
    return this.users;
  }

  getUserById(){
    
  }

  deleteUser(id:number):Observable<{}>{
    return this.http.delete<any>(this.getUrl + '/user/'+`${id}`)
  }

  blockUser(id:number){

  }

}

