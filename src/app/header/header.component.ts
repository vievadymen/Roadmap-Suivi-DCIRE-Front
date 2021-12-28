import { Component, OnInit } from '@angular/core';
import { tokenGetter } from '../app.module';
import {ConnexionComponent} from '../connexion/connexion.component'
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private auth:AuthService, private tokenStorage:TokenStorageService) { }

  ngOnInit(): void {

    this.getUser()    

   }
   //public user = this.tokenStorage.getUser()

   public currentUser:any

   getUser(){
    let user = JSON.parse(localStorage.getItem('currentUser') || '{}')
   
    this.currentUser = user.data.username
     console.log(user.data.username);
   }
//public userc= this.auth.InfosSave(this.token)

  public logout(){
    this.auth.logout();

  }

}
