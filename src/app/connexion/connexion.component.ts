import { TokenStorageService } from './../services/token-storage.service';
import { AbstractControl, FormArray,FormBuilder, Validators,FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../services/auth.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import {  } from "../services/token-storage.service";
import { UserService } from "../services/user.service";



const helper = new JwtHelperService();


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  form:FormGroup;

  submitted = false;

  ConnexionUserData = {
    username:'',
    password:''
  }
    
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private _auth: AuthService, 
     private fb: FormBuilder,
     private tokenStorage: TokenStorageService,
     private _router: Router, public jwtHelper: JwtHelperService) {  }


  ngOnInit():void { 

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles;
    }

    this.form = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
  });
    
  }

  get f() { return this.form.controls  }
  

  login() {

    this.submitted = true;

    if (this.form.invalid) {
      return;
      
    }

     const val = this.form.value;
    //if (val.username && val.password) {

      console.log(this.form.value);
      
       this._auth.connexionUser(this.form.value)
        .subscribe(
          token => {
            console.log(token)
            localStorage.setItem('token', token.token)
            this._router.navigate(['/suivi'])

          //  this.tokenStorage.saveToken(token.accessToken);//** */
           // this.tokenStorage.saveUser(token); //** */

           // this.isLoginFailed = false;
          //  this.isLoggedIn = true;
           // this.roles = token.data.roles;
          //const   connectedUser = token.data.username
          
            // return connectedUser
          }
        );
  //  }
    
  }
  hide = true;

 

  getConnectedUser(){
    const val = this.form.value;
    return val;
  }

}

