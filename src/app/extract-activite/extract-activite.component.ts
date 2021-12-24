import { Component, OnInit } from '@angular/core';
import { ActiviteService } from '../services/activite.service';
import { Time } from '@angular/common';
import * as XLSX from 'xlsx'; 
import { Difficulte } from '../models/difficulte';
import { DifficulteService } from '../services/difficulte.service';
import { EvenementService } from '../services/evenement.service';




export interface Activites {
  id: number;
  libelle: String;
  date: Date;
  heure:Time; // au lieu de mettre tranche horaire je mets heure pour le moment --- mer 3nov
}

@Component({
  selector: 'app-extract-activite',
  templateUrl: './extract-activite.component.html',
  styleUrls: ['./extract-activite.component.scss']
})
export class ExtractActiviteComponent implements OnInit {

  public activites:any;
  public totalLength :any;
  public difficultes: any;
  public evenements:any;


  constructor(private _activite:ActiviteService, private difficulte: DifficulteService, private evenement:EvenementService) { }

  ngOnInit(): void {
    this.getAllActivite();
    this.showDifficulte();
    this.showEvent();
  }

  getAllActivite(){
    this._activite.getActivite().subscribe(data=>{
      console.warn(data)
      this.activites = data
      this.totalLength = data.length 
    });
  
  }


  public showDifficulte(){
    this.difficulte.getDifficulte().subscribe(
      data =>{
        console.warn(data);     
        this.difficultes =data;
      })
  }

  public  showEvent(){
    this.evenement.getEvenenement().subscribe(
      data=>{
        console.warn(data);
        this.evenements= data;
      });
  }




    /*name of the excel-file which will be downloaded. */ 
activite= 'ExcelSheet.xlsx';  

exportexcel(): void 
{
   /* table id is passed over here */   
   let element = document.getElementById('activite-table'); 
   const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

   /* generate workbook and add the worksheet */
   const wb: XLSX.WorkBook = XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

   /* save to file */
   XLSX.writeFile(wb, this.activite);
  
}

}
