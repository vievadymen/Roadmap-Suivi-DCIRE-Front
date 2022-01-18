import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActiviteService } from '../services/activite.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { FormControl } from "@angular/forms";
import { Time, getLocaleDateTimeFormat } from '@angular/common';
import { DifficulteService } from '../services/difficulte.service';
import { EvenementService } from '../services/evenement.service';
import * as moment from 'moment';
import 'moment/locale/fr';
import { th } from 'date-fns/locale';




export interface Activites {
  id: number;
  libelle: String;
  date: Date;
  heure: Time; // au lieu de mettre tranche horaire je mets heure pour le moment --- mer 3nov
}

export interface Difficulte {
  id: number;
  description: String;
}



@Component({
  selector: 'app-list-activite',
  templateUrl: './list-activite.component.html',
  styleUrls: ['./list-activite.component.scss']
})
export class ListActiviteComponent implements OnInit {

  public totalLength: any;
  public activites: any;
  public idActivite: any;
  public activiteItem: any;
  public p: number = 1;
  public diff: any;
  public idDifficulte: any;
  public difficulteItem: any;
  public events: any;
  public valeurtagDiff: [] = [];
  public idEvent: any;
  public startOfWeek: any;
  public endOfWeek: any;
  message?: string;
  modalRef?: BsModalRef;
  public eventItem: any;
  public weekNumber: any

  editForm = new FormGroup({
    libelle: new FormControl(''),
    date: new FormControl(''),
  });

  editDiffForm = new FormGroup({
    description: new FormControl(''),
  });

  editEventForm = new FormGroup({
    thematique: new FormControl(''),
    start: new FormControl(''),
  });

  addForm = new FormGroup({
    //  libelle : new FormControl('',Validators.required),
    //date: new FormControl(''), 
    tags: new FormArray([])
  });

  diffForm = new FormGroup({
    description: new FormControl(''),
    tagDiff: new FormArray([])
  });


  constructor(private _activite: ActiviteService, private modalService: BsModalService,
    private difficulte: DifficulteService, private fb: FormBuilder,
    private evenement: EvenementService,) { }


  ngOnInit(): void {
    this.startOfWeek = moment().startOf('week');

    this.endOfWeek = moment().endOf('week');

    this.weekNumber = moment().week();



    this.editDiffForm = this.fb.group({
      description: (''),
    });

    this.editEventForm = this.fb.group({
      thematique: (''),
      start: ('')
    });


    this.addForm =
      this.fb.group({
        libelle: ['', Validators.required],
        date: [''],
        tags: this.fb.array([])

      });

    this.diffForm = this.fb.group({
      description: (''),
      tagDiff: this.fb.array([])
    });

    this.getAllActivite();
    this.showDifficulte();
    this.showEvent();
  }

  openModal(template: TemplateRef<any>, id: any) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    this.idActivite = id;
  }

  openDiffModal(templateDiff: TemplateRef<any>, id: any) {
    this.modalRef = this.modalService.show(templateDiff, { class: 'modal-sm' });
    this.idDifficulte = id;
  }

  openEditModal(editcontent: TemplateRef<any>, id: any) {
    this.modalRef = this.modalService.show(editcontent, { class: 'modal-lg' });
    this.idActivite = id;
    this.getSelectedActivite(this.idActivite);
    this.displayActivite(this.activiteItem);
  }

  openEditDiffModal(editDiffcontent: TemplateRef<any>, id: any) {
    this.modalRef = this.modalService.show(editDiffcontent, { class: 'modal-lg' });
    this.idDifficulte = id;
    this.getSelectedDifficulte(this.idDifficulte);
    this.displayDifficulte(this.difficulteItem);
  }

  openEditEventModal(editEventcontent: TemplateRef<any>, id: any) {

    this.modalRef = this.modalService.show(editEventcontent, { class: 'modal-lg' });
    this.idEvent = id;
    this.getSelectedEvent(this.idEvent);
    this.displayEvent(this.eventItem);
  }

  openDeleteEventModal(templateDeleteEvent: TemplateRef<any>, id: any) {
    this.modalRef = this.modalService.show(templateDeleteEvent, { class: 'modal-sm' });
    this.idEvent = id;
    console.log(id);
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.modalRef?.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef?.hide();
  }


  public getAllActivite() {
    this._activite.getActiviteBySemaine(this.weekNumber).subscribe(data => {
      console.warn(data)
      this.activites = data.reverse()
      this.totalLength = data.length
    });

  }

  public showDifficulte() {
    this.difficulte.getDifficulte().subscribe(
      data => {
        console.warn(data);
        this.diff = data.reverse();
      }
    )
  }


  public showEvent() {
    this.evenement.getEvenementBySemaine(this.weekNumber).subscribe(
      data => {
        console.warn(data);
        this.events = data.reverse();
      });
  }


  public passId(id: any) {
    this.idActivite = id;
    console.log(id);
  }

  public getSelectedActivite(id: any): void {

    this._activite.getActiviteByID(id).subscribe(
      (activites) => {
        console.log(activites);

        this.activiteItem = activites
        this.displayActivite(activites);

      }
    )
  }

  public updateActivite() {
    console.log(this.idActivite);
    console.log(this.editForm.value);

    this._activite.updateActivite(this.idActivite, this.editForm.value).subscribe(
      res => {
        console.log(res);
      });
    this.confirm();
    this.getAllActivite();
  }


  public DeleteActivite() {
    this._activite.DeleteActivite(this.idActivite).subscribe(
      (response) => {
        this.confirm();
        this.getAllActivite();
        //alert ('supprimmé avec succes') 
      },
      (error) => {
        console.log(error);
      })
  }

  /**
   * 
   * préremplir formulaire de modification difficulté
   */

  public displayDifficulte(difficulte: Difficulte[]): void {

    this.diff = difficulte;
    console.log(this.diff);
    this.editDiffForm.patchValue({
      description: this.diff.description
    })
  }


  /**
   * récupérer la difficulté
   */
  public getSelectedDifficulte(id: any): void {

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
     * préremplir formulaire de modification activité
     */

  public displayActivite(activite: Activites[]): void {

    this.activites = activite;
    // console.log(activite);
    this.editForm.patchValue({
      libelle: this.activites.libelle,
      date: this.activites.date
    })
  }

  PostDifficulte() {
    if (this.addForm.value !== ' ') {
      this.valeurtagDiff = this.diffForm.getRawValue();
      let valeurtagDiff = {
        "description": this.diffForm.value.description
      }
      this.difficulte.postDifficulte(valeurtagDiff).subscribe(
        data => {
          console.log('Difficultés:' + data);
        }
      );
      this.diffForm.value.tagDiff.forEach((element: any) => {
        this.difficulte.postDifficulte(element).subscribe();
      });
    }
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

  /**
* 
* préremplir formulaire de modification événement
*/

  public displayEvent(event: any[]): void {

    this.events = event;
    this.editEventForm.patchValue({
      thematique: this.events.thematique,
      start: this.events.start
    })
  }

  public updateDifficulte() {
    console.log(this.idDifficulte);
    console.log(this.editDiffForm.value);

    this.difficulte.updateDifficulte(this.idDifficulte, this.editDiffForm.value).subscribe(
      res => {
        console.log(res);
        this.confirm();
        this.refreshPage();
      });
    //     
  }

  public updateEvenement() {
    console.log(this.idEvent);
    console.log(this.editEventForm.value);
    this.evenement.updateEvenenement(this.idEvent, this.editEventForm.value).subscribe(
      res => {
        console.log(res);
        this.confirm();
        this.refreshPage();
      });
  }

  public DeleteEvent() {
    this.evenement.DeleteEvenement(this.idEvent).subscribe(
      (res) => {
        this.confirm();
        this.refreshPage();
      },
      (error) => {
        console.log(error);

      }
    )
  }

  public removeDifficulte() {
    this.difficulte.deleteDifficulte(this.idDifficulte).subscribe(
      (res) => {
        this.confirm();
        this.refreshPage();
      })

  }

  public refreshPage() {
    this.getAllActivite();
    this.showDifficulte();
    this.showEvent();
  }



}
