import { Component, OnInit,TemplateRef } from '@angular/core';
import { UserService } from '../services/user.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {Users} from '../models/user'
import { el } from 'date-fns/locale';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

 public users:any;
 public userItem:any;
 public p: number = 1;
 public totalLength :any;
 public etat:boolean= true;
 public idUser:any;
 modalRef?: BsModalRef;


 editForm = new FormGroup({
  nom: new FormControl(''),
  prenom: new FormControl(''),
  matricule: new FormControl(''),
  structure: new FormControl(''),
  profil: new FormControl(''),
});



  constructor(private user:UserService, private modalService: BsModalService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getUsers();

    this.editForm = this.fb.group({
      nom: (''),
      prenom: (''),
      matricule: (''),
      structure: (''),
      profil: (''),
    });

  }

  openEditModal(editcontent: TemplateRef<any>, id: any) {
    this.modalRef = this.modalService.show(editcontent, { class: 'modal-lg' });
    this.idUser = id;
   this.getSelecteUser(this.idUser);
   this.displayUser(this.userItem);
  }

  public getUsers(){
    this.user.getUsers().subscribe(data=>{
      console.log(data)
      this.users = data 
      this.totalLength =data.length 
    },
    (error) =>{
      console.log(error);
      alert (error)
    } );
  }

  openModal(template: TemplateRef<any>, id:any) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    this.idUser = id;
  }
   
  decline(): void {
    this.modalRef?.hide();
  }

  public displayUser(user: any): void {
    this.users = user;
    this.editForm.patchValue({
      nom: this.users?.nom,
      prenom: this.users?.prenom,
      matricule:this.users?.matricule,
      structure:this.users?.structure?.libelle,
      profil:this.users?.profil?.libelle
    })
  }


 public deleteUser(){
  this.user.deleteUser(this.idUser).subscribe(
    (response) =>{
  },
  (error) =>{
    console.log(error);
  })
}

// public passId(id: any) {
//   this.idEvent = id;
//   console.log(id);
// }
public action:any ='désactivé'
public isDisabled:boolean = false

public getUserById(id:any){

  this.idUser= id
  console.log(this.idUser);
  this.user.getUserById(id).subscribe(
    data=>{
      console.log(data);
      this.user= data
      console.log(this.user);
      this.isDisabled = true
    }
  )

}

public getSelecteUser(id: any): void {

  this.user.getUserById(id).subscribe(
    (users) => {
      console.log(users);
      this.userItem = users
      this.displayUser(users);
    })
}


public BlockUser( id:number){
  console.log( $('.btn_' + id).is(":checked"));
  let isChecked =  $('.btn_' + id).is(":checked")
  let action : object
  if (isChecked == true) {
    action = {'action': 'active'}
  }
  else{
    action = {'action': 'desactive'}
  }
  console.log(action);
  
this.user.blockUser(id, action).subscribe(
  res=>{
    console.log(res);
    
  }
)
}

public updateUser(){

}

}