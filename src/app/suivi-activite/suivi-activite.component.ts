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

  public PrevAndNextClicked = false;

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
    moment(moment().toDate(), "MM-DD-YYYY").isoWeek()

   
      
    let n = moment().format('LLL')
    console.log(n);
      

          this.startDayWeek = moment().startOf('week')
          this.endDayWeek  = moment().endOf('week')
          this.weekNumber = moment().week();


  }  

    getCurrentUser(){
      const token = localStorage.getItem('token');
    }
 
  

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

    this.PrevAndNextClicked = true;
    if (this.weekNumber <= 1) {
      return;
    }

    this.weekNumber = moment().subtract(1, 'weeks').week()
    this.startDayWeek = moment().subtract(1, 'weeks').startOf('week')
    this.endDayWeek  = moment().subtract(1, 'weeks').endOf('week')
  }
  

  public next(){
    // for (let index = 1; index < moment().week(); index++) {
    //   const element = array[index];
      
    // }
   // for ( this.weekNumber = 0; this.weekNumber < 52; this.weekNumber++) {
      this.weekNumber = moment().add(1, 'weeks').week()
      this.startDayWeek = moment().add(1, 'weeks').startOf('week')
      this.endDayWeek  = moment().add(1, 'weeks').endOf('week')
    //}


  }

  public semainePrecedente(){

    // this._activite.getActiviteBySemaine(this.weekNumber - 1).subscribe(data=>{
    //   console.warn(data)
    //   this.activites = data.reverse()
    //   this.totalLength = data.length 
    // });
  
  
          }

}
