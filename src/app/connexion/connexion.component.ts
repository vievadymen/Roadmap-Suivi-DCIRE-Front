import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  ConnexionUserData = {
    username:'',
    password:''
  }
  constructor(private _auth: AuthService,
    private _router: Router) { }

  ngOnInit(): void {
  }

  ConnexionUser(){
    this._auth.connexionUser(this.ConnexionUserData)
    .subscribe(
      token => {
        console.log(token)
        localStorage.setItem('token', token.token)
        this._router.navigate(['/admin'])
      }
    )
  }
  hide = true;
}
