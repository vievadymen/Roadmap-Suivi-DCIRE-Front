import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private getUrl = "http://127.0.0.1:8000"
  constructor(private http:HttpClient) { }

  postUsers(user:any){
    return this.http.post<any>(this.getUrl +'/user', user)
  }

  users = this.http.get<any>(this.getUrl +'/user')


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

