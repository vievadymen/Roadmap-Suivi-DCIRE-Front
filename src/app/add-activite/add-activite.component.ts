import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { AbstractControl, FormArray,FormBuilder, FormGroup, Validators,  } from '@angular/forms';
import { DifficulteService } from '../services/difficulte.service';
import { EvenementService } from '../services/evenement.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActiviteService } from '../services/activite.service';
import { Router,ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import 'moment/locale/fr';


@Component({
  selector: 'app-add-activite',
  templateUrl: './add-activite.component.html',
  styleUrls: ['./add-activite.component.scss']
})
export class AddActiviteComponent implements OnInit {

  submitted = false;

  modalRef?: BsModalRef;
  message?: string;

public valeurtags :[]=[];

public valeurtagDiff :[]=[];

public valeurtagEvent :[]=[];

public activites:any;

public startDayWeek:any;

public endDayWeek:any;




  addForm= new FormGroup({
      libelle : new FormControl('',Validators.required),
      date: new FormControl(''), 
      tags: new FormArray([])
     });

     diffForm = new FormGroup({
      description: new FormControl(''),
      tagDiff: new FormArray([])
    })
    
    eventForm=new FormGroup({
      thematique: new FormControl(''),
      date: new FormControl(''),
      tagEvent: new FormArray([])
    });

  constructor(private fb: FormBuilder, private difficulte:DifficulteService,
     private evenement:EvenementService,
    private  _activite:ActiviteService,
    private _router: Router,
    private route: ActivatedRoute
     ) { }

  ngOnInit(): void {

    this.addForm = this.fb.group({
      libelle:['', Validators.required],
      date: ['', Validators.required],
      tags:this.fb.array([])
    });

    this.diffForm = this.fb.group({
      description:['', Validators.required],
      tagDiff:this.fb.array([])
     });

     this.eventForm = this.fb.group({
      thematique:(''),
      start:['', Validators.required],
      tagEvent:this.fb.array([])
    });


    this.startDayWeek = moment().weekday(1);
    this.endDayWeek  = moment().weekday(+7);
  
  }

  public AddActivite() {
   
    this.submitted = true;
    this.valeurtags= this.addForm.getRawValue();
    let firstvaleur={
      "libelle": this.addForm.value.libelle,
      "date": this.addForm.value.date
    }
 
    console.log(firstvaleur);

    if (this.addForm.invalid || this.diffForm.invalid ) {
      return;
  }

    this._activite.postActivite(firstvaleur).subscribe(
    data => {
 // },
    //  (error) => {
    //    console.log('Erreur ! : ' + error);
   } );

   this.addForm.value.tags.forEach((element: any) => {
     this._activite.postActivite(element).subscribe();
   });

   this._activite.getActivite().subscribe(data=>{
     console.warn(data)
     this.activites = data
   });

   this.valeurtagEvent = this.eventForm.getRawValue();
   this.evenement.postEvenement(this.valeurtagEvent).subscribe(
     event=>{
       console.log(event);
     } );
     this.eventForm.value.tagEvent.forEach((element: any) => {
       this.evenement.postEvenement(element).subscribe();
     });

   this.confirm(); 
   this.PostDifficulte();
  //  this.showDifficulte();
  //  this.showEvent();
   this.addForm.reset();
   this.diffForm.reset();
   this.eventForm.reset();
   this.redirection();
   //this.getAllActivite();
   //this.addEvent();
 
}

public redirection(){
  this._router.navigate(['../list-activite'], { relativeTo: this.route })
  
}


  public get f() { 
    return this.addForm.controls 
   }

  public get d() { 
    return this.diffForm.controls 
   }


  public get e() { 
    return this.eventForm.controls 
   }


  public get tags():FormArray {
    //ajouter une boucle pour limiter les champs dynamiques
    return this.addForm.get('tags') as FormArray;
  }

  public get tagDiff():FormArray {
    //ajouter une boucle pour limiter les champs dynamiques
    return this.diffForm.get('tagDiff') as FormArray;
  }


  confirm(): void {
    this.message = 'Confirmed!';
    this.modalRef?.hide();
  }
 
  decline(): void {
    this.message = 'Declined!';
    this.modalRef?.hide();
  }

  public deleteTagDiff(i:number):void{
    this.tagDiff.removeAt(i);
    this.tagDiff.markAsDirty();
  } 

  public deleteTagEvent(i:number):void{
    this.tagEvent.removeAt(i);
    this.tagEvent.markAsDirty();
  } 

  public deleteTag(index:number):void {
    this.tags.removeAt(index);
    this.tags.markAsDirty();
  }

  public addTagDiff(){
    if (this.indexDiff <=4) {
      let addtagDiff =this.diffForm.get('tagDiff') as FormArray;
      addtagDiff.push(this.fb.group({
        description:[],
      })); 
      this.indexDiff++;
    } 
    return false;
    
   //  else {
   //    alert('Vous ne pouvez enregistrer que dix (10) activités')
   //  }
}

public addTagEvent(){
  if (this.indexEvent <=4) {
    let addtagEvent =this.eventForm.get('tagEvent') as FormArray;
    addtagEvent.push(this.fb.group({
      thematique:[],
      start:[]
    })); 
    this.indexEvent++;
  } 
  return false;
  
 //  else {
 //    alert('Vous ne pouvez enregistrer que dix (10) activités')
 //  }
}

 
public get tagEvent():FormArray {
  //ajouter une boucle pour limiter les champs dynamiques
  return this.eventForm.get('tagEvent') as FormArray;
}


  index:number = 1;
  indexDiff:number =1;
  indexEvent:number = 1;

  public addTags(){
      if (this.index <=4) {
        let addtags =this.addForm.get('tags') as FormArray;
        addtags.push(this.fb.group({
          libelle:[],
          date: []
        })); 
        this.index++;
      } 
      return false;
      
     //  else {
     //    alert('Vous ne pouvez enregistrer que dix (10) activités')
     //  }
  }

  public addEvent(){
    this.evenement.postEvenement(this.eventForm.value).subscribe(
      event=>{
        console.log(event);
      },
      (error) =>{
        console.log(error);
      } );
  }


  PostDifficulte(){
    if (this.addForm.value !==' ') {
      this.valeurtagDiff= this.diffForm.getRawValue();
      let valeurtagDiff={
        "description": this.diffForm.value.description
      }
     this.difficulte.postDifficulte(valeurtagDiff).subscribe(
       data =>{
         console.log('Difficultés:'+data);
       }
     );
     this.diffForm.value.tagDiff.forEach((element: any) => {
      this.difficulte.postDifficulte(element).subscribe();
    });
     }
   }

  

}
