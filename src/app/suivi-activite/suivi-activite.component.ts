import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { formatDate } from '@fullcalendar/angular';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormArray,FormBuilder, FormGroup, Validators,  } from '@angular/forms';
import { FormControl } from "@angular/forms";


export interface Fruit {
  name: string;
 
}



@Component({
  selector: 'app-suivi-activite',
  templateUrl: './suivi-activite.component.html',
  styleUrls: ['./suivi-activite.component.scss']
})

export class SuiviActiviteComponent implements OnInit {

  structureTitle ="";

  addForm= new FormGroup({
    libelle : new FormControl('',Validators.required),
    date: new FormControl(''),
    startTime: new FormControl(''),
    endtTime: new FormControl('')
   });

constructor (
  private httpClient: HttpClient,
  private fb: FormBuilder,
  ) {     }

  ngOnInit():void{
    this.addForm = this.fb.group({
      libelle:['', Validators.required],
      date: [''],
      startTime: [''],
      endTime: [''],
      tags:this.fb.array([])
    });

  
    }  
    get libelle() { return this.addForm.get('libelle'); }

    get date() { return this.addForm.get('date'); }

    get startTime() { return this.addForm.get('startTime'); }

    get endTime() { return this.addForm.get('endTime'); }

    
   
    public get tags():FormArray {
      return this.addForm.get('tags') as FormArray;
    }

    public addTags(): void {
      this.tags.push(new FormControl());
      
    }

    public deleteTag(index:number):void {
      this.tags.removeAt(index);
      this.tags.markAsDirty();
    }

    onSubmit() {
      // TODO: Use EventEmitter with form value
      console.warn(this.addForm.value);
    }

    /* fonction pour afficher le numéro de la semaine courante

    currentdate = new Date();
 oneJan = new Date(this.currentdate.getFullYear(),0,1);
 numberOfDays:number = Math.floor((this.currentdate - this.oneJan) / (24 * 60 * 60 * 1000));
 result = Math.ceil(( currentdate.getDay() + 1 + numberOfDays) / 7);
console.log(`The week number of the current date (${currentdate}) is ${result}.`);
*/



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




 /* 
 var calendar = new Calendar(calendarEl, {
    views: {
      dayGrid: {
        // options apply to dayGridMonth, dayGridWeek, and dayGridDay views
      },
      timeGrid: {
        // options apply to timeGridWeek and timeGridDay views
      },
      week: {
        // options apply to dayGridWeek and timeGridWeek views
      },
      day: {
        // options apply to dayGridDay and timeGridDay views
      }
    }
  }); 
  */
}
