import { TokenStorageService } from './../services/token-storage.service';
import { AbstractControl, FormArray,FormBuilder, Validators,FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../services/auth.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import {  } from "../services/token-storage.service";
import { BehaviorSubject,Observable } from "rxjs";
import { User } from '../models/user';
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

  public user= new User();
    
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


//   onLoggedin()
//   {
//     console.log(this.user);
//     let isValidUser: Boolean = this._auth.SignIn(this.user);
//     console.log("valid user "+isValidUser);
//     if (isValidUser)
//     {
//       console.log("isadmin "+this._auth.isAdmin());
//       this._router.navigate(['/suivi']);     
//     }
//       else
//         alert("Non connecté, Login ou mot de passe incorrect!");
// }


seConnecter() {
  this.submitted = true;
  console.log(this.form.value);
  this._auth.login(this.form.value).subscribe(
    (data :any)=>
    {  
      const helper = new JwtHelperService();
      const decode =  helper.decodeToken(data['token']);
      const role = decode.roles[0];
      console.log(data)
      localStorage.setItem('token', data.token);
      localStorage.setItem('nom', decode.nom)
      localStorage.setItem('structure', decode.structure);
      if(role=== 'ROLE_PP'){
        this._router.navigate(['/suivi'])
      }
      else{
        this._router.navigate(['/suivi/accueil-user'])
      }
    }
  );
    }
  

  login() {

    this.submitted = true;

    if (this.form.invalid) {
      alert("nom d'utilisateur ou mot de passe invalide")
      return;
      
    }

     const val = this.form.value;
    //if (val.username && val.password) {

      console.log(this.form.value);
      
       this._auth.login(this.form.value).subscribe(
          token => {
            console.log(token)
            let myuser = token.data.username
            console.log(myuser);
            localStorage.setItem('token', token.token)
            this._router.navigate(['/suivi'])

          //  this.tokenStorage.saveToken(token.accessToken);//** */
           // this.tokenStorage.saveUser(token); //** */

           // this.isLoginFailed = false;
          //  this.isLoggedIn = true;
           // this.roles = token.data.roles;
          //const   connectedUser = token.data.username
          
            // return connectedUser

          });
  //  }
    
  }
  hide = true;

 
}

