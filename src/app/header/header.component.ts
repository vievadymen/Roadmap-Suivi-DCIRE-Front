import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  modalRef?: BsModalRef;

  is_admin:boolean = false;
  constructor(public auth:AuthService, private tokenStorage:TokenStorageService, private modalService: BsModalService) { }

  ngOnInit(): void {

    this.getUser()   
    this.is_admin = (localStorage.getItem("roles")==="ROLE_PP")?true:false;

   }

   openEditEventModal(editEventcontent: TemplateRef<any>) {

    this.modalRef = this.modalService.show(editEventcontent, { class: 'modal-lg' });
   // this.idEvent = id;
  }

   decline(): void {
  //   this.message = 'Declined!';
     this.modalRef?.hide();
   }
 
   //public user= this.tokenStorage.getUser()

   public currentUser:any
   public currentStructure:any
   public username:any
   public email:any

   getUser(){
    let user = localStorage.getItem('nom')
    let structure =localStorage.getItem('structure')
    let myuser = localStorage.getItem('username')
    let email = localStorage.getItem('email')
    this.currentStructure = structure
    this.username= myuser
    this.email = email
   
    this.currentUser = user
     console.log(user);
   }
//public userc= this.auth.InfosSave(this.token)

  public logout(){
    this.auth.logout();

  }

  public showUser(){

  }

}
