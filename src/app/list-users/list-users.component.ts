import { Component, OnInit,TemplateRef } from '@angular/core';
import { UserService } from '../services/user.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {Users} from '../models/user'

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

 public users:any[]=[];
 public p: number = 1;
 public totalLength :any;
 public etat:boolean= true;
 public idUser:any;
 modalRef?: BsModalRef;


  constructor(private user:UserService, private modalService: BsModalService,) { }

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers(){
    this.user.getUsers().subscribe(data=>{
      console.warn(data)
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



 public deleteUser(){
  this.user.deleteUser(this.idUser).subscribe(
    (response) =>{
  },
  (error) =>{
    console.log(error);
  })
}

}
