import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx'; 
import { EvenementService } from '../services/evenement.service';
import { StructureService } from '../services/structure.service';

@Component({
  selector: 'app-extract-roadmap',
  templateUrl: './extract-roadmap.component.html',
  styleUrls: ['./extract-roadmap.component.scss']
})
export class ExtractRoadmapComponent implements OnInit {

  public events:any;
  public structures : any;
  public totalLength :any;
  public struc:any;
  public idEvent:any;

  constructor(private evenement:EvenementService, private structure:StructureService) { }

  ngOnInit(): void {
    this.showEvent();
    this.getStructure();
  }


  public  showEvent(){
    this.evenement.getEvenenement().subscribe(
      data=>{
        console.warn(data);
        this.events = data.reverse();
      });
  }

  //ajouté récemment
  myEventsByStructure(id:any){
    this.evenement.getEvenementByStructure(id).subscribe(
      data=>{
        console.warn(data);
        this.events = data.evenement;

      }
    )
  }

  //ajouté recemment
  public passId(id:any){
    this.idEvent = id;
    console.log(id);       
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


  getStructure(){
    this.structure.getStructure().subscribe(
      data=>{
        console.log(data);
        this.structures = data;
      }
    )
  }


  event= 'ExcelSheet.xlsx';  
  
  exportexcel(): void 
{
   /* table id is passed over here */   
   let element = document.getElementById('roadmap-table'); 
   const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

   /* generate workbook and add the worksheet */
   const wb: XLSX.WorkBook = XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

   /* save to file */
   XLSX.writeFile(wb, this.event);
  
}

}
