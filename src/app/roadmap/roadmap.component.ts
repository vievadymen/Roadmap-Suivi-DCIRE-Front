import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { formatDate } from '@fullcalendar/angular';
import { Calendar } from "@fullcalendar/angular";
import { HttpClient } from '@angular/common/http';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { getLocaleDateTimeFormat } from '@angular/common';


export interface Fruit {
  name: string;
}


@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.scss']
})
export class RoadmapComponent implements OnInit {

  structureTitle:string = ''

  clickItem(event:any){
    this.structureTitle = event.title;
    return this.structureTitle
    console.log(this.structureTitle);
    
  }

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

  
  constructor (private httpClient: HttpClient) { }

  onDateClick(res:any) {
    alert('Vous avez cliqué sur la date : ' + res.dateStr)
  }

  ngOnInit(){
    setTimeout(() => {
      return this.httpClient.get('http://localhost:8000/event')
        .subscribe(res => {
            this.Events.push();
            console.log(this.Events);
        });
    }, 2200);

    setTimeout(() => {
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        dateClick: this.onDateClick.bind(this),
        events: this.Events
      };
    }, 2500);
        
    }  


  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    weekends: false, // initial value
  };
//methode pour cacher les wk
  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
  }

date =new Date();
firstDayOfYear = new Date(this.date.getFullYear(), 0, 1)
pastDaysOfYear = (this.date.valueOf() - this.firstDayOfYear.valueOf()) / 86400000
Tabmois = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

mois= this.date.getMonth();
annee= this.date.getFullYear();
GetMonth(){
  return this.mois;
}

GetYear(){
  return this.annee;
}
toSring():string{
  return this.Tabmois[this.mois]+'  '+ this.annee;
}
 
}
