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

  editEventForm = new FormGroup({
    thematique: new FormControl(''),
    start: new FormControl(''),
    end: new FormControl(''),
  });



  addEventForm = new FormGroup({
    thematique: new FormControl(''),
    start: new FormControl(''),
    end: new FormControl(''),
    tags: new FormArray([]),
    tagEvents: new FormArray([]),
  })



  calendarOptions: CalendarOptions = {
    headerToolbar: {
      center: 'dayGridMonth,timeGridWeek,listWeek',
    },
    plugins: [listPlugin, interactionPlugin, dayGridPlugin],
    initialView: 'dayGridMonth',
    events: [
      {
        color:'#378001',
        groupId: '1',
      },
      {
        color:'red',
        groupId: '2',
      },
      {
        color:'yellow',
        groupId: '3',
      },
      {
        color:'green',
        groupId: '4',
      },
      {
        color:'blue',
        groupId: '5',
      },
      {
        color:'black',
        groupId: '6',
      }
    ],

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
    private evenement: EvenementService) { }

  ngOnInit(): void {
    this.getEvents();
    this.getMyEvents();

    this.addEventForm = this.fb.group({
      thematique: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      fonction_autorite: [''],
      tagEvents: this.fb.array([])
    });

    this.editEventForm = this.fb.group({
      thematique: (''),
      start: (''),
      end: ('')
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
public structure:any
  public getEvents() {
    this.events = []
    this.event.getEvenenement().subscribe(
      (data) => {
        data.forEach((element: any) => {
          element.start = this.transformDate(element.start)
          element.end = this.transformDate(element.end)
          element.title = element.thematique
          element.color = element.structure?.color
          //console.log(element.structure);
          // //element.draggable=true
          this.structure = element.structure
          this.events.push(element);
        })
        
       // console.log(this.events);
        console.log(this.structure);
        this.events.forEach((event:any) =>{
          // if (this.structure.libelle === 'PP') {
          //   console.log(event);
            
          // event.color='#27ae60'
          // }else{
          //   event.color = 'red'
          // }
        })
        
        this.calendarOptions.events = this.events;
      })
    console.log(this.events);
  }

  public updateEvenement() {
    console.log(this.idEvent);
    console.log(this.editEventForm.value);
    this.evenement.updateEvenenement(this.idEvent, this.editEventForm.value).subscribe(
      res => {
        console.log(res);
        this.confirm();
        this.getEvents();
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
        fonction_autorite: [],
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
      "fonction_autorite": this.addEventForm.value.fonction_autorite
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
    this.editEventForm.patchValue({
      thematique: this.eventItem.thematique,
      start: this.eventItem.start,
      end: this.eventItem.end
   })
  }


}



