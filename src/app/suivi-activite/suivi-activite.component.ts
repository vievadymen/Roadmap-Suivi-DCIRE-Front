import { DifficulteService } from './../services/difficulte.service';
import { AuthService } from './../services/auth.service';
import { User } from '../models/user';
import { Component, OnInit,ViewChild,TemplateRef  } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormArray,FormBuilder, FormGroup, Validators,  } from '@angular/forms';
import { FormControl } from "@angular/forms";
import { ActiviteService } from "../services/activite.service";
import { Time, getLocaleDateTimeFormat } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from './../services/token-storage.service';
import { isDataSource } from '@angular/cdk/collections';
//import * as $ from 'jquery';
 var $ : any;
//import { Activites } from "./../../models/activites.model";
import * as moment from 'moment';
import 'moment/locale/fr';
import { EvenementService } from '../services/evenement.service';
import * as XLSX from 'xlsx'; 




moment.locale('fr');

export interface Fruit {
  name: string;
}


  export interface Activites {
    id: number;
    libelle: String;
    date: Date;
    heure:Time; // au lieu de mettre tranche horaire je mets heure pour le moment --- mer 3nov
}


export interface Difficulte {
  id: number;
  description: String;
 
}



@Component({
  selector: 'app-suivi-activite',
  templateUrl: './suivi-activite.component.html',
  styleUrls: ['./suivi-activite.component.scss']
 })

export class SuiviActiviteComponent implements OnInit {

 
  
  modalRef?: BsModalRef;
  message?: string;

  submitted = false;

  structureTitle ="";

  postuser :any;

  currentUser: any ;

  public activites:any;

  public idActivite:any;

  public idDifficulte:any;

  public idEvent:any;

  public activiteItem:any

  public difficulteItem:any;

  public eventItem:any;

  public diff: any;

  public events:any;

  public startDayWeek:any;

  public endDayWeek:any;
  
  public weekNumber:any;

  public p: number = 1;
  
  public totalLength :any;


  $ : any;
 
  addForm= new FormGroup({
  //  libelle : new FormControl('',Validators.required),
    //date: new FormControl(''), 
    tags: new FormArray([])
   });
  
   editForm= new FormGroup({
     libelle: new FormControl(''),
     date:new FormControl(''),
   });

   editDiffForm= new FormGroup({
    description: new FormControl(''),
  });

  editEventForm= new FormGroup({
    thematique: new FormControl(''),
    date:new FormControl(''),
  });


   eventForm=new FormGroup({
    thematique: new FormControl(''),
    date: new FormControl(''),
    tagEvent: new FormArray([])
  });

   diffForm = new FormGroup({
     description: new FormControl(''),
     tagDiff: new FormArray([])
   })

   myUser:any
   
public valeurtags :[]=[];

public valeurtagDiff :[]=[];

public valeurtagEvent :[]=[]


constructor (  private httpClient: HttpClient,
               private fb: FormBuilder, 
               private  _activite: ActiviteService,
               private auth:AuthService,
               private difficulte:DifficulteService,
               private activatedRoute: ActivatedRoute,
               private router: Router,
               private _token: TokenStorageService ,
               private modalService: BsModalService,
               private evenement: EvenementService,
                )  {  }


  ngOnInit():void{

    console.log(moment.locale());

    let n = moment().format('LLL')
    console.log(n);
      


         this.myUser= this.auth.currentUserValue;
         console.log(this.myUser);
         
          this.getAllActivite();
          this.showDifficulte();
          this.showEvent();
         

          this.addForm = 
          this.fb.group({
            libelle:['', Validators.required],
            date: [''],
            tags:this.fb.array([])

          });

          this.editForm = this.fb.group({
            libelle: (''),
            date:('')
          });

          this.editDiffForm = this.fb.group({
            description: (''),
          });

          this.editEventForm = this.fb.group({
            thematique: (''),
            date:('')
          });



          this.eventForm = this.fb.group({
            thematique:(''),
            date:(''),
            tagEvent:this.fb.array([])
          });

          this.activatedRoute.paramMap.subscribe(params =>{
            const id = params.get('id');
            console.log(id);            
          });

        //  this.currentUser = this._token.getUser()?.split(',')
         // console.log(this.currentUser);
 
          
          this.diffForm = this.fb.group({
           description:(''),
           tagDiff:this.fb.array([])
          });
       
          this.startDayWeek =moment().startOf('week');
          this.endDayWeek  = moment().endOf('week');
          this.weekNumber = moment().week();

         
  }  
    
    openModal(template: TemplateRef<any>, id:any) {
      this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
      this.idActivite = id;
      
    }
    openDiffModal(templateDiff: TemplateRef<any>, id:any) {
      this.modalRef = this.modalService.show(templateDiff, {class: 'modal-sm'});
      this.idDifficulte = id;
    }
    open(content: TemplateRef<any>) {
      this.modalRef = this.modalService.show(content, {class: 'modal-lg'});
    }

    openEditModal(editcontent: TemplateRef<any>, id:any) {
      this.modalRef = this.modalService.show(editcontent, {class: 'modal-lg'});
      this.idActivite = id;
      this.getSelectedActivite(this.idActivite);
      this.displayActivite(this.activiteItem);
    }

    openEditDiffModal(editDiffcontent: TemplateRef<any>, id:any) {
      this.modalRef = this.modalService.show(editDiffcontent, {class: 'modal-lg'});
      this.idDifficulte = id;
      this.getSelectedDifficulte(this.idDifficulte);
      this.displayDifficulte(this.difficulteItem);
    }

    openDeleteEventModal(templateDeleteEvent: TemplateRef<any>, id:any){
      this.modalRef = this.modalService.show(templateDeleteEvent, {class: 'modal-sm'});
      this.idEvent = id;    
      console.log(id);
    }

    openEditEventModal(editEventcontent: TemplateRef<any>, id:any){

      this.modalRef = this.modalService.show(editEventcontent, {class: 'modal-lg'});
      this.idEvent = id;
      this.getSelectedEvent(this.idEvent);
      this.displayEvent(this.eventItem);
    }

    confirm(): void {
      this.message = 'Confirmed!';
      this.modalRef?.hide();
    }
   
    decline(): void {
      this.message = 'Declined!';
      this.modalRef?.hide();
    }
  
    public get libelle() { return this.addForm.get('libelle'); }

    public get date() { return this.addForm.get('date'); }

    public get startTime() { return this.addForm.get('startTime'); }

    public get endTime() { return this.addForm.get('endTime'); }

    public get tags():FormArray {
      //ajouter une boucle pour limiter les champs dynamiques
      return this.addForm.get('tags') as FormArray;
    }
  
    public get tagDiff():FormArray {
      //ajouter une boucle pour limiter les champs dynamiques
      return this.diffForm.get('tagDiff') as FormArray;
    }
  
    public get tagEvent():FormArray {
      //ajouter une boucle pour limiter les champs dynamiques
      return this.eventForm.get('tagEvent') as FormArray;
    }
  


   
 
   indexDiff:number =1;
   indexEvent:number = 1;
   index:number = 1;

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
      date:[]
    })); 
    this.indexEvent++;
  } 
  return false;
  
 //  else {
 //    alert('Vous ne pouvez enregistrer que dix (10) activités')
 //  }
}

public deleteTagEvent(i:number):void{
  this.tagEvent.removeAt(i);
  this.tagEvent.markAsDirty();
} 

  public deleteTagDiff(i:number):void{
    this.tagDiff.removeAt(i);
    this.tagDiff.markAsDirty();
  } 
 
  public deleteTag(index:number):void {
    this.tags.removeAt(index);
    this.tags.markAsDirty();
  }


  public AddActivite() {
   
       this.submitted = true;
       this.valeurtags= this.addForm.getRawValue();
       let firstvaleur={
         "libelle": this.addForm.value.libelle,
         "date": this.addForm.value.date
       }

       console.log(firstvaleur);

    this._activite.postActivite(firstvaleur).subscribe(
       data => {
        console.log("C'est OK");
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

      this.valeurtagEvent= this.eventForm.getRawValue();
      this.evenement.postEvenement(this.valeurtagEvent).subscribe(
        event=>{
          console.log(event);
        } );
        this.eventForm.value.tagEvent.forEach((element: any) => {
          this.evenement.postEvenement(element).subscribe();
        });

      this.confirm(); 
      this.PostDifficulte();
      this.showDifficulte();
      this.showEvent();
      this.addForm.reset();
      this.diffForm.reset();
      this.eventForm.reset();
      //this.getAllActivite();
      //this.addEvent();
    
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
 


    getAllActivite(){
      this._activite.getActivite().subscribe(data=>{
        console.warn(data)
        this.activites = data
        this.totalLength =data.length 
      });
    
    }

 
  /**
   * récupérer l'activité
   */
    public getSelectedActivite(id:any):void{
      
      this._activite.getActiviteByID(id).subscribe(
        (activites) => {
          console.log(activites);
         
          this.activiteItem = activites
          this.displayActivite(activites);          
          
        }
      )
    }

    /**
   * récupérer l'événement
   */
     public getSelectedEvent(id:any):void{
      
      this.evenement.getEventById(id).subscribe(
        (events) => {
          console.log(events);
         
          this.eventItem = events
          this.displayEvent(events);          
          
        }
      )
    }

        /**
     * 
     * préremplir formulaire de modification événement
     */
 
    public displayEvent(event:any[]):void{

          this.events = event;
             this.editEventForm.patchValue({
              thematique: this.events.thematique,
              start: this.events.start 
             })   
       }
    

    /**
     * 
     * préremplir formulaire de modification activité
     */
 
    public displayActivite(activite:Activites[]):void{

       this.activites = activite;
         // console.log(activite);
          this.editForm.patchValue({
           libelle: this.activites.libelle,
           date: this.activites.date
          })   
    }


  /**
   * récupérer la difficulté
   */
   public getSelectedDifficulte(id:any):void{
      
    this.difficulte.getDifficulteById(id).subscribe(
      (difficultes) => {
      //  console.log(difficultes);
        this.difficulteItem = difficultes
        this.displayDifficulte(difficultes);          
        
      }
    )
  }
    /**
     * 
     * préremplir formulaire de modification difficulté
     */

    public displayDifficulte(difficulte:Difficulte[]):void{
      
      this.diff = difficulte;
      console.log(this.diff);
      this.editDiffForm.patchValue({
      description: this.diff.description
      })   
    }

       
   public updateActivite(){
      console.log(this.idActivite);
      console.log(this.editForm.value);
      
     this._activite.updateActivite(this.idActivite,this.editForm.value).subscribe(
     res => { 
           console.log(res); 
     });   
     this.confirm();
     this.getAllActivite();
        
     }

    public updateDifficulte(){
      console.log(this.idDifficulte);
      console.log(this.editDiffForm.value);
      
     this.difficulte.updateDifficulte(this.idDifficulte,this.editDiffForm.value).subscribe(
     res => { 
           console.log(res); 
           this.confirm();
           this.refreshPage();
     });   
    // 
        
     }

    public updateEvenement(){
      console.log(this.idEvent);
      console.log(this.editEventForm.value);
      
     this._activite.updateActivite(this.idEvent,this.editEventForm.value).subscribe(
     res => { 
           console.log(res); 
     });   
     this.confirm();
     this.getAllActivite();
        
     }
     

   public passId(id:any){
       this.idActivite = id;
       console.log(id);       
    }

  public passIdDifficulte(id:any){
      this.idDifficulte = id;
      console.log(id);
      
    }
  public saveCompleted():void {
      this.editForm.reset();
    }
   

  public DeleteActivite(){
      this._activite.DeleteActivite(this.idActivite).subscribe(
        (response) =>{
          this.confirm();
          this.getAllActivite();
        //alert ('supprimmé avec succes') 
      },
      (error) =>{
        console.log(error);
      })

    }

  public DeleteEvent(){
    this.evenement.DeleteEvenement(this.idEvent).subscribe(
      (res)=>{
        this.confirm();
        this.refreshPage();
      },
      (error)=>{
        console.log(error);
        
      }
    )
  } 

  public removeDifficulte(){
      this.difficulte.deleteDifficulte(this.idDifficulte).subscribe(
        (res) =>{
           this.confirm();
          this.refreshPage();
        } )
   
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

  public  showEvent(){
      this.evenement.getEvenenement().subscribe(
        data=>{
          console.warn(data);
          this.events= data;
        });
    }

    public showDifficulte(){
      this.difficulte.getDifficulte().subscribe(
        data =>{
          console.warn(data);     
          this.diff =data;
        }
      )}


 
public refreshPage(){
  this.getAllActivite();
  this.showDifficulte();
  this.showEvent();
}

    getCurrentUser(){
      const token = localStorage.getItem('token');
    }
 
  
    onSubmit() {
      // TODO: Use EventEmitter with form value
      console.warn(this.addForm.value);
    }

    get f() { return this.addForm.controls  }

  

    currentdate = new Date();
    oneJan = new Date(this.currentdate.getFullYear(),0,1);
    numberOfDays:number = Math.floor((this.currentdate.valueOf() - this.oneJan.valueOf()) / (24 * 60 * 60 * 1000));

    //result = Math.ceil(( this.currentdate.getDay() + 1 + this.numberOfDays) / 7);

    currentfrdate = this.currentdate.toLocaleDateString('fr-FR');

    endWeek = this.currentfrdate.valueOf(); // à revoir


    // public showWeek(){
    //   console.log('la semaine est: ' + this.result);
 
    // }


/**
 * fenêtre modal ajout event
 */
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  fruits: Fruit[] = [
   // {name: 'Lemon'},
  //{name: 'Lime'},
  //{name: 'Apple'},

  ];
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }
  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  Events = [];


  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    weekends: false, // initial value
  };
//methode pour cacher les wk
  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
  }

  public previous(){
    let num = this.weekNumber -1
    console.log(num);
    
  }

  public next(){
    let num = this.weekNumber +1
    console.log(num);

  }


}
