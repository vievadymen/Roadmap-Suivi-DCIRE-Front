import * as $ from "jquery";
import 'bootstrap';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CalendarOptions, Identity } from '@fullcalendar/angular'; // useful for typechecking
import { EvenementService } from '../services/evenement.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import dayGridPlugin from '@fullcalendar/daygrid'; // for dayGridMonth view
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as moment from 'moment';
import 'moment/locale/fr';
import { StructureService } from '../services/structure.service';





@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  providers: [DatePipe]
})
export class NotificationComponent implements OnInit {

  public events: any[];
  myEvents: any;
  myEvent: any;
  public modalRef?: BsModalRef;
  public clikedEvent: any;
  public displayModal: boolean;
  index: number = 1;
  public valeurtags: [] = [];
  public myId: any;
  public idEvent: any;
  public eventItem: any;
  public structures: any;


  editEventForm = new FormGroup({
    thematique: new FormControl(''),
    start: new FormControl(''),
    end: new FormControl(''),
    lieu: new FormControl(''),
    autorite: new FormControl(''),

  });



  addEventForm = new FormGroup({
    thematique: new FormControl(''),
    start: new FormControl(''),
    end: new FormControl(''),
    confirmation: new FormControl(''),
    autorite: new FormControl(''),
    lieu: new FormControl(''),
    tagEvents: new FormArray([]),
  })



  calendarOptions: CalendarOptions = {
    headerToolbar: {
//center: 'dayGridMonth,timeGridWeek,listWeek',
    },
    plugins: [listPlugin, interactionPlugin, dayGridPlugin],
    initialView: 'dayGridMonth',
    events: [],
    locale: 'fr',
    selectable: true,
    eventClick: (event) => {
      let clickedEvent: any;
      this.events.forEach((evenement: any) => {
        if (evenement.id === event.event._def.publicId) {
          clickedEvent = evenement;
          return clickedEvent
        }
      });
      console.log(event)
      this.clikedEvent = clickedEvent;
      this.myId = event.event._def.publicId
      console.log(event.event._def.publicId);
      this.getEventById(event.event._def.publicId);

      this.displayModal = true;
    },
    dateClick: function (info) {
      alert('Vous avez cliqué sur: ' + info.dateStr);
      // change the day's background color just for fun
      //  info.dayEl.style.backgroundColor = 'red';
    },
  };


  constructor(private event: EvenementService, private datePipe: DatePipe,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private evenement: EvenementService,
    private struct: StructureService) { }

  ngOnInit(): void {
    this.getEvents();
    this.getMyEvents();
    this.getStructure();
    this.isAllowedToModify();

    this.addEventForm = this.fb.group({
      thematique: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      confirmation: ['', Validators.required],
      autorite: [''],
      lieu: [''],
      tagEvents: this.fb.array([])
    });

    this.editEventForm = this.fb.group({
      thematique: (''),
      start: (''),
      end: (''),
      lieu: (''),
      autorite: ('')
    });



  }
  submitted = false;

  get f() { return this.addEventForm.controls }


  public get tagEvents(): FormArray {
    //ajouter une boucle pour limiter les champs dynamiques
    return this.addEventForm.get('tagEvents') as FormArray;
  }

  public deleteTag(index: number): void {
    this.tagEvents.removeAt(index);
    this.tagEvents.markAsDirty();
  }

  transformDate(date: any) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  public details(info: any) {
    alert('Vous avez cliqué sur ' + info.event.title)
  }

  public getEventById(id: any): void {
    this.evenement.getEventById(id).subscribe(
      (e) => {
        this.myEvent = e
        console.log(e);

      }
    )
  }
  public structure: any
  public structureColor: any
  public getEvents() {
    this.events = []
    this.event.getEvenenement().subscribe(
      (data) => {
        data.forEach((element: any) => {
          element.start = this.transformDate(element.start)
          element.end = this.transformDate(element.end)
          element.title = element.thematique
          element.color = element.structure?.color
          this.structure = element.structure
          this.structureColor = element.color
          element.autorite = element.autorite
          if (element.autorite) {
            element.backgroundColor = "black"
            element.textColor ="orange"
          }
          console.log(element.color);
          this.events.push(element);
        })

        // console.log(this.events);
        console.log(this.structure);
        this.events.forEach((event: any) => {

        })

        this.calendarOptions.events = this.events;
      })
    console.log(this.events);
  }

  public Mystruct :any

  public isAllowedToModify(){
   this.Mystruct = localStorage.getItem('structure')
   console.log(this.Mystruct);
   

  }

  public updateEvenement() {
    console.log(this.idEvent);
    console.log(this.editEventForm.value);
    this.evenement.updateEvenenement(this.idEvent, this.editEventForm.value).subscribe(
      res => {
        console.log(res);
        this.confirm();
        this.getEvents()
        this.displayModal = false;
      });
  }


  public getMyEvents() {
    this.event.getEvenenement().subscribe(
      (data) => {
        this.myEvents = data
        console.log(this.myEvents);
      }
    )
  }

  decline(): void {
    // this.message = 'Declined!';
    this.modalRef?.hide();
  }

  openModal(template: TemplateRef<any>, id: any) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    this.idEvent = id;
    console.log(id);
  }

  open(content: TemplateRef<any>) {
    this.modalRef = this.modalService.show(content, { class: 'modal-lg' });
  }

  openEditEventModal(editEventcontent: TemplateRef<any>, id: any) {

    this.modalRef = this.modalService.show(editEventcontent, { class: 'modal-lg' });
    this.idEvent = id;
    this.getSelectedEvent(this.idEvent);    
    this.displayEvent(this.eventItem);
  }


  public addTagEvents() {
    if (this.index <= 14) {
      let addtags = this.addEventForm.get('tagEvents') as FormArray;
      addtags.push(this.fb.group({
        thematique: [],
        start: [],
        end: [],
        autorite: [],
        lieu: [],
        // tags:this.fb.array([]),
        tagEvents: this.fb.array([])
      }));
      this.index++;
    }
    return false;

    //  else {
    //    alert('Vous ne pouvez enregistrer que dix (10) activités')
    //  }
  }

  public addEvent(): void {

    this.submitted = true;
    this.valeurtags = this.addEventForm.getRawValue();

    let firstvaleur = {
      "thematique": this.addEventForm.value.thematique,
      "start": this.addEventForm.value.start,
      "end": this.addEventForm.value.end,
      "confirmation": this.addEventForm.value.confirmation,
      "autorite": this.addEventForm.value.autorite,
      "lieu": this.addEventForm.value.lieu
    }


    console.log(firstvaleur);

    if (this.addEventForm.invalid) {
      return;
    }
    this.evenement.postEvenement(firstvaleur).subscribe(
      event => {
        console.log(event);
      },
      (error) => {
        console.log(error);
      });
    this.addEventForm.value.tagEvents.forEach((element: any) => {
      this.evenement.postEvenement(element).subscribe();
    });
    this.addEventForm.reset()
    this.confirm();
    this.getEvents();
    this.evenement.sendMAilEvent().subscribe(
      data =>{
        
      }
    )
  }

  confirm(): void {
    this.modalRef?.hide();
  }


  public DeleteEvent() {
    this.evenement.DeleteEvenement(this.idEvent).subscribe(
      (response) => {
        this.confirm();
        this.getEvents();
        this.displayModal = false;
      },
      (error) => {
        console.log(error);
      })
  }

  /**
* récupérer l'événement
*/
  public getSelectedEvent(id: any): void {

    this.evenement.getEventById(id).subscribe(
      (events) => {
        console.log(events);
        this.eventItem = events
        this.displayEvent(events);
      }
    )
  }

  public displayEvent(event: any[]): void {
    this.eventItem = event;
    console.warn(event);
        
    this.editEventForm.patchValue({
      thematique: this.eventItem?.thematique,
      start: this.transformDate(this.eventItem?.start) ,
      end: this.transformDate(this.eventItem?.end) ,
      lieu: this.eventItem?.lieu,
      autorite: this.eventItem?.autorite
    })
  }

  public myStructures: any;
  public getStructure() {
    this.struct.getStructure().subscribe(
      data => {
        console.log(data);
        this.myStructures = data;
      }
    )
  }

  public lesEvents: any

  myEventsByStructure(id: any) {
    this.evenement.getEvenementByStructure(id).subscribe(
      data => {
        this.lesEvents = data.evenement
        console.log(data);
        this.lesEvents.forEach((element: any) => {
          element.start = this.transformDate(element.start)
          element.end = this.transformDate(element.end)
          element.title = element.thematique
          element.color = data.color
          this.structure = element.structure
          this.events.push(element);
        });
        console.warn(data.evenement);
        this.events = data.evenement;
        this.calendarOptions.events = this.events;
      }
    )
  }

  public getSelectedStructure(id: any): void {

    this.struct.getStructureById(id).subscribe(
      (event) => {
        console.log(event.id);
        this.myEventsByStructure(id);
        // if (!event.id) {
        //   this.structures= event

        // }    
      }
    )
  }


}



