import { Component, OnInit } from '@angular/core';
import { ActiviteService } from '../services/activite.service';
import { Time } from '@angular/common';
import * as XLSX from 'xlsx';
import { Difficulte } from '../models/difficulte';
import { DifficulteService } from '../services/difficulte.service';
import { EvenementService } from '../services/evenement.service';
import { StructureService } from '../services/structure.service';
import * as moment from 'moment';
import 'moment/locale/fr';




export interface Activites {
  id: number;
  libelle: String;
  date: Date;
  heure: Time; // au lieu de mettre tranche horaire je mets heure pour le moment --- mer 3nov
}

@Component({
  selector: 'app-extract-activite',
  templateUrl: './extract-activite.component.html',
  styleUrls: ['./extract-activite.component.scss']
})
export class ExtractActiviteComponent implements OnInit {

  public activites: any;
  public totalLength: any;
  public difficultes: any;
  public evenements: any;
  public structures: any;
  public activities: any;
  public idEvent: any;

  public PrevAndNextClicked = false;
  public weekNumber: any;
  public startDayWeek: any;
  public endDayWeek: any;
  public month: any




  constructor(private _activite: ActiviteService, private difficulte: DifficulteService,
    private evenement: EvenementService, private structure: StructureService) { }

  ngOnInit(): void {


    this.startDayWeek = moment().startOf('week')
    this.endDayWeek = moment().endOf('week')
    this.weekNumber = moment().week();
    this.countWeeks = moment().weeksInYear();
    this.month = moment().month()
    
    console.warn(this.month);
    

  

    this.getAllActivite();
    this.showDifficulte();
    this.showEvent();
    this.getStructure();
  }


  public getAllActivite() {
    this._activite.getActiviteBySemaine(this.weekNumber).subscribe(data => {
      console.warn(data)
      this.activites = data.reverse()
      this.totalLength = data.length
    });
  }


  public showDifficulte() {
    this.difficulte.getDifficulteBySemaine(this.weekNumber).subscribe(
      data => {
        console.warn(data);
        this.difficultes = data.reverse();
      }
    )
  }
  public showEvent() {
    this.evenement.getEvenementBySemaine(this.weekNumber).subscribe(
      data => {
        console.warn(data);
        this.evenements = data.reverse();
      });
  }




  /*name of the excel-file which will be downloaded. */
  activite = 'ExcelSheet.xlsx';

  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('activite-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.activite);

  }

  

  public passId(id: any) {
    this.idEvent = id;
    console.log(id);
  }

  getStructure() {
    this.structure.getStructure().subscribe(
      data => {
        console.log(data);
        this.structures = data;
      }
    )
  }


  myEventsByStructure(id: any) {
    this.evenement.getEvenementByStructure(id).subscribe(
      data => {
        console.warn(data);
        this.evenements = data.evenement;
      })
  }

  myActivitiesByStructure(id: any) {
    this._activite.getActiviteByStructure(id).subscribe(
      data => {
        console.warn(data);
        this.activites = data.activite;
      })
  }



  myDifficultesByStructure(id: any) {
    this._activite.getActiviteByStructure(id).subscribe(
      data => {
        console.warn(data);
        this.activites = data.activite;
      })
  }


  // public selectedStructure: any
  // public getSelectedStructure(id: any): void {

  //   this.structure.getStructureById(id).subscribe(
  //     (event) => {
  //       console.log(event.id);
  //       this.myActivitiesByStructure(event.id);
  //       this.selectedStructure = event.libelle
  //       this.myEventsByStructure(event.id)
  //     }
  //   )
  // }
  public selectedStructure: any
  public getSelectedStructure(id: any): void {

    this.structure.getStructureById(id).subscribe(
      (structure) => {
        console.log(structure.id);
        this.selectedStructure = structure.libelle
        this._activite.getActiviteByStructureSemaine(structure.id, this.weekNumber).subscribe(
          data => {
            this.activites = data
            this.totalLength = data.length
            console.log(data);

          });
          this.evenement.getEvenementByStructureSemaine(structure.id, this.weekNumber).subscribe(
            data=>{
              this.evenements = data
              console.log(data);
            }
          )

          this.difficulte.getDifficulteByStructureSemaine(structure.id, this.weekNumber).subscribe(
            data=>{
              this.difficultes = data
              console.log(data);
              
            }
          )

      }
    )
  }



  public previous(weekNumber: any) {
    let datre = parseInt(weekNumber);
    if (datre > 1) {
      this.weekNumber = datre - 1;

      this.startDayWeek = moment().startOf('week').week(this.weekNumber)
      this.endDayWeek = moment().endOf('week').week(this.weekNumber)

      this._activite.getActiviteBySemaine(this.weekNumber).subscribe(data => {
        console.warn(data)
        this.activites = data.reverse()
        this.totalLength = data.length
      });

      this.evenement.getEvenementBySemaine(this.weekNumber).subscribe(
        data => {
          console.warn(data);
          this.evenements = data.reverse();
        });

      this.difficulte.getDifficulteBySemaine(this.weekNumber).subscribe(
        data => {
          console.warn(data);
          this.difficultes = data.reverse();
        });
    }
  }

  public countWeeks: any;

  public next(weekNumber: any) {

    let datre = parseInt(weekNumber);
    if (datre <= this.countWeeks) {
      this.PrevAndNextClicked = true;
      this.weekNumber = datre + 1;

      this.startDayWeek = moment().startOf('week').week(this.weekNumber)
      this.endDayWeek = moment().endOf('week').week(this.weekNumber)
    }

    this._activite.getActiviteBySemaine(this.weekNumber).subscribe(data => {
      console.warn(data)
      this.activites = data.reverse()
      this.totalLength = data.length
    });

    this.evenement.getEvenementBySemaine(this.weekNumber).subscribe(
      data => {
        console.warn(data);
        this.evenements = data.reverse();
      });

    this.difficulte.getDifficulteBySemaine(this.weekNumber).subscribe(
      data => {
        console.warn(data);
        this.difficultes = data.reverse();
      });
  }



}
