import { TokenStorageService } from './../services/token-storage.service';
import { AuthService } from './../services/auth.service';
import { EvenementService } from './../services/evenement.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import { User } from '../models/user';


export class Evenement{
constructor(
  public id: number,
  public thematique:string
){}

}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentUser: any  ;
  datas:any

  
  evenement:Evenement[]= [];

  constructor(private _event: EvenementService, private _user: UserService, private _auth: AuthService, private _token: TokenStorageService) {

  }

  ngOnInit(): void {
    this.currentUser = this._token.getUser()?.split(',')

  }
 


/** 
getAllUsers() {
  this._user.getUsers().subscribe(data=>{
    console.warn(data)
  });
  //console.log(this._user.users);  
}

*/
}
