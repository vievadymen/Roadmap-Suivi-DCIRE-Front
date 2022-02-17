import { A } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { AbstractControl, FormArray,FormBuilder, FormGroup, Validators,  } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { StructureService } from '../services/structure.service';
import { ProfilService } from '../services/profil.service';


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
    structure:new FormControl(''),
    profil:new FormControl('')
  });

  constructor( private fb:FormBuilder,private user:UserService,
    private _router: Router, private route: ActivatedRoute,
    private structure: StructureService, private profil: ProfilService) {}

  ngOnInit(): void {
    
    this.getStructure();
    this.getProfil();

    this.AddUserForm = this.fb.group({
      nom:['', Validators.required],
      prenom:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      matricule:['', Validators.required],
      structure:['', Validators.required],
      profil:['', Validators.required],

    });
  }

  get f() { return this.AddUserForm.controls  }

  public addUser(){
    console.log(this.AddUserForm.value);
    
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

  public structures:any;

  getStructure() {
    this.structure.getStructure().subscribe(
      data => {
        console.log(data);
        this.structures = data;
      }
    )
  }

  public profils :any;
  getProfil(){
    this.profil.getProfils().subscribe(
      data=>{
        console.log(data);
        this.profils = data.data
      }
    )
  }

}