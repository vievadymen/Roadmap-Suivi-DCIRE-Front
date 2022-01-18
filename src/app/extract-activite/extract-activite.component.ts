import { Component, OnInit } from '@angular/core';
import { ActiviteService } from '../services/activite.service';
import { Time } from '@angular/common';
import * as XLSX from 'xlsx'; 
import { Difficulte } from '../models/difficulte';
import { DifficulteService } from '../services/difficulte.service';
import { EvenementService } from '../services/evenement.service';
import { StructureService } from '../services/structure.service';




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
  public structures : any;
  public activities : any;
  public idEvent: any;



  constructor(private _activite:ActiviteService, private difficulte: DifficulteService,
     private evenement:EvenementService,  private structure:StructureService) { }

  ngOnInit(): void {
    this.getAllActivite();
    this.showDifficulte();
    this.showEvent();
    this.getStructure();

  }

  getAllActivite(){
    this._activite.getActivite().subscribe(data=>{
      console.warn(data)
      this.activites = data.reverse()
      this.totalLength = data.length 
    });
  
  }


  public showDifficulte(){
    this.difficulte.getDifficulte().subscribe(
      data =>{
        console.warn(data);     
        this.difficultes = data.reverse();
      })
  }

  public  showEvent(){
    this.evenement.getEvenenement().subscribe(
      data=>{
        console.warn(data);
        this.evenements = data.reverse();
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

public passId(id:any){
  this.idEvent = id;
  console.log(id);       
}

getStructure(){
  this.structure.getStructure().subscribe(
    data=>{
      console.log(data);
      this.structures = data;
    }
  )
}


myEventsByStructure(id:any){
  this.evenement.getEvenementByStructure(id).subscribe(
    data=>{
      console.warn(data);
      this.evenements = data.evenement;
    } )
}

myActivitiesByStructure(id:any){
  this._activite.getActiviteByStructure(id).subscribe(
    data=>{
      console.warn(data);
      this.activites = data.activite;
    } )
}

myDifficultesByStructure(id:any){
  this._activite.getActiviteByStructure(id).subscribe(
    data=>{
      console.warn(data);
      this.activites = data.activite;
    } )
}



public getSelectedStructure(id:any):void{
      
  this.structure.getStructureById(id).subscribe(
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
