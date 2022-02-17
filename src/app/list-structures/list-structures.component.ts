import { Component, OnInit, TemplateRef } from '@angular/core';
import { StructureService } from '../services/structure.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-list-structures',
  templateUrl: './list-structures.component.html',
  styleUrls: ['./list-structures.component.scss']
})
export class ListStructuresComponent implements OnInit {

  public structures: any;
  public idStruct: any;
  public structureItem: any;
  modalRef?: BsModalRef;


  editForm = new FormGroup({
    libelle: new FormControl(''),
  });



  constructor(private struct: StructureService, private modalService:BsModalService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getStructures()


    this.editForm = this.fb.group({
      libelle: (''),
    });

  }

  openModal(template: TemplateRef<any>, id:any) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    this.idStruct = id;
  }

  openEditModal(editcontent: TemplateRef<any>, id: any) {
    this.modalRef = this.modalService.show(editcontent, { class: 'modal-lg' });
    this.idStruct = id;
    this.getSelectedStructure(this.idStruct);
    this.displayStructure(this.structureItem);
  }
     
  decline(): void {
    this.modalRef?.hide();
  }


  confirm(): void {
    this.modalRef?.hide();
  }

  public getStructures(){
    this.struct.getStructure().subscribe(
      data => {
        this.structures = data
        console.log(data)
        
      }
    )
  }

  public updateStructure(){
    this.struct.updateStructure(this.idStruct,this.editForm.value).subscribe(
      data=>{
        console.log(data)
      }
    )
    this.getStructures();
    this.confirm();
  }

  public deleteStructure(){
    this.struct.deleteStructure(this.idStruct).subscribe(
      data=>{
        console.log(data);
        
      }
    )
  }

  public displayStructure(structure: any[]): void {
    this.structures = structure;
    this.editForm.patchValue({
      libelle: this.structures?.libelle,
    })
  }

  public getSelectedStructure(id: any): void {

    this.struct.getStructureById(id).subscribe(
      (strustures) => {
        console.log(strustures);
        this.structureItem = strustures
        this.displayStructure(strustures);

      })
  }

}
