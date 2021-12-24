import { A } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { AbstractControl, FormArray,FormBuilder, FormGroup, Validators,  } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-profil',
  templateUrl: './add-profil.component.html',
  styleUrls: ['./add-profil.component.scss']
})
export class AddProfilComponent implements OnInit {
  submitted = false;
  

  AddUserForm=new FormGroup({
    nom: new FormControl(''),
    prenom: new FormControl(''),
    email:new FormControl(''),
    matricule:new FormControl(''),
    departement:new FormControl(''),
  });

  constructor( private fb:FormBuilder,private user:UserService,
    private _router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.AddUserForm = this.fb.group({
      nom:['', Validators.required],
      prenom:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      matricule:['', Validators.required],
      departement:['', Validators.required],
    });
  }

  get f() { return this.AddUserForm.controls  }

  public addUser(){
    this.submitted = true;
    if (this.AddUserForm.invalid) {
      return;
  }
    this.user.postUsers(this.AddUserForm.value).subscribe(
      data=>{
        console.log(data);
      },
      (error)=>{
        console.log(error);
      }
    )

   setTimeout(function() {alert('Utilisateur ajouté avec succes')});

    this.AddUserForm.reset();
   this._router.navigate(['../list-users'], { relativeTo: this.route })

   
  console.log('bien enregistré!!');
  
  }

}