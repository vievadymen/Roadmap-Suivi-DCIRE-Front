import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CalendarOptions,Identity } from '@fullcalendar/angular'; // useful for typechecking
import { EvenementService } from '../services/evenement.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import listPlugin from '@fullcalendar/list';






@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  providers:[DatePipe]
})
export class NotificationComponent implements OnInit {

  events: Identity[] ;

  public modalRef?: BsModalRef;



  calendarOptions: CalendarOptions = {
    headerToolbar: {
      center: 'dayGridMonth'
    },
    plugins: [ listPlugin ],
    initialView: 'dayGridMonth',
    events: [],
    eventColor: '#378001',
    //eventClick: this.details,
    locale: 'fr',
    selectable: true,
    eventClick: function(info) {
      alert('Titre: ' + info.event.title + '  '+
            'Date début: ' + info.event.start + '  '+
            'Date de fin: ' + info.event.end);
      // change the border color just for fun
      info.el.style.borderColor = 'red';
    }
  };

  constructor(private event:EvenementService, private datePipe: DatePipe, private modalService: BsModalService,) { }

  ngOnInit(): void {
    this.getEvents();
  }

  transformDate(date:any) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  public details(template: TemplateRef<any>){
    alert('Vous avez cliqué sur ')
  }

public getEvents(){
  this.events= []
  this.event.getEvenenement().subscribe(
    (data) =>{
      data.forEach((element:any)=>{
        element.start = this.transformDate(element.start)
        element.end = this.transformDate(element.end)
        element.title = element.thematique
      //  element.draggable=true
        this.events.push(element);
      })
      this.calendarOptions.events = this.events
      })
      console.log(this.calendarOptions.events);
    }

}



