import { Component, OnInit, ChangeDetectionStrategy,
  ViewChild,
  TemplateRef, } from '@angular/core';

  import { map } from 'rxjs/operators';


import { HttpClient } from '@angular/common/http';
import localeEs from '@angular/common/locales/es';


import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EvenementService } from '../services/evenement.service';
import { BsModalService,BsModalRef } from 'ngx-bootstrap/modal';
import { AbstractControl, FormArray,FormBuilder, FormGroup, Validators,  } from '@angular/forms';
import { FormControl } from "@angular/forms";
import { EventColor } from 'calendar-utils';
//import { CustomDateFormatter } from './custom-date-formatter.provider';



const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};


export interface Fruit {
  name: string;
}


@Component({
  selector: 'app-roadmap',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.scss']
})
export class RoadmapComponent {

  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  modalRef?: BsModalRef;


  public idEvent:any;

  viewDate: Date = new Date();

  addEventForm = new FormGroup({
    thematique: new FormControl(''),
    start: new FormControl(''),
    end: new FormControl(''),
    tags: new FormArray([]),
    tagEvents:new FormArray([]),
  })

  submitted = false;

  public valeurtags :[]=[];

  get f() { return this.addEventForm.controls  }
  

  modalData: {
    action: string;
    event: CalendarEvent;
  } | undefined;

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  public get tags():FormArray {
    //ajouter une boucle pour limiter les champs dynamiques
    return this.addEventForm.get('tags') as FormArray;
  }

  public get tagEvents():FormArray {
    //ajouter une boucle pour limiter les champs dynamiques
    return this.addEventForm.get('tagEvents') as FormArray;
  }


  events: CalendarEvent[] = [];



myEvents(){
  this.evenement.getEvenenement().subscribe((data) =>{
    data.forEach((element:any)  => {
      console.log(element);
      element.start = new Date(element.start)
      element.end = new Date(element.end)
      element.actions = this.actions
      element.color = colors.yellow
      element.title=element.thematique
      
      this.events.push(element);
    });
    
  })
  console.log(this.events);
  
}

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal,   private evenement: EvenementService,
    private modalService:BsModalService,
    private fb: FormBuilder) {}

  ngOnInit():void{
    this.myEvents();
    
    this.addEventForm = 
    this.fb.group({
      thematique:['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      fonction_autorite:[''],
      tags:this.fb.array([]),
      tagEvents:this.fb.array([])
    });
    
   }



  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {

    this.submitted = true;
    this.valeurtags= this.addEventForm.getRawValue();

    let firstvaleur={
      "thematique": this.addEventForm.value.thematique,
      "start": this.addEventForm.value.start,
      "end": this.addEventForm.value.end,
      "fonction_autorite": this.addEventForm.value.fonction_autorite
    }

    console.log(this.addEventForm.value);

    this.evenement.postEvenement(firstvaleur).subscribe(
      event=>{
        console.log(event);
      },
      (error) =>{
        console.log(error);
      } );
    
    // this.events = [
    //   ...this.events,
    //   {
    //     thematique: 'Nouvel événement',
    //     start: startOfDay(new Date()),
    //     end: endOfDay(new Date()),
    //     lieu: 'Sonatel',
    //     etat: 'actif',
    //     structure_org:'REX',
    //     structure_concernee:'CORP',
    //     color: colors.red,
    //     draggable: true,
    //     resizable: {
    //       beforeStart: true,
    //       afterEnd: true,
    //     },
    //   },
    // ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }


  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  open(content: TemplateRef<any>) {
    this.modalRef = this.modalService.show(content, {class: 'modal-lg'});
  }

  decline(): void {
    this.modalRef?.hide();
  }

  public get thematique() { return this.addEventForm.get('thematique'); }
  public get start() { return this.addEventForm.get('start'); }
  public get end() { return this.addEventForm.get('end'); }
  public get fonction_autorite() { return this.addEventForm.get('fonction_autorite'); }




  index:number = 1;

  // public addTags(){
  //     if (this.index <=2) {
  //       let addtags =this.addEventForm.get('tags') as FormArray;
  //       addtags.push(this.fb.group({
  //         fonction_autorite: []
  //       })); 
  //       this.index++;
  //     } 
  //     return false;
 
  // }

  public addTagEvents(){
      if (this.index <=2) {
        let addtags = this.addEventForm.get('tagEvents') as FormArray;
        addtags.push(this.fb.group({
          thematique:[],
          start: [],
          end: [],
          fonction_autorite: [],
         // tags:this.fb.array([]),
          tagEvents:this.fb.array([])
        })); 
        this.index++;
      } 
      return false;
      
     //  else {
     //    alert('Vous ne pouvez enregistrer que dix (10) activités')
     //  }
  }

  public deleteTag(index:number):void {
    this.tagEvents.removeAt(index);
    this.tagEvents.markAsDirty();
  }


 
}
