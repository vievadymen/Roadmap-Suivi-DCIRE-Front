import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  is_admin:boolean = false;
  constructor(public auth:AuthService, private tokenStorage:TokenStorageService) { }

  ngOnInit(): void {

    this.getUser()   
    this.is_admin = (localStorage.getItem("roles")==="ROLE_PP")?true:false;

   }
   //public user= this.tokenStorage.getUser()

   public currentUser:any

   getUser(){
    let user = localStorage.getItem('nom')
   
    this.currentUser = user
     console.log(user);
   }
//public userc= this.auth.InfosSave(this.token)

  public logout(){
    this.auth.logout();

  }

}
