import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx'; 
import { EvenementService } from '../services/evenement.service';

@Component({
  selector: 'app-extract-roadmap',
  templateUrl: './extract-roadmap.component.html',
  styleUrls: ['./extract-roadmap.component.scss']
})
export class ExtractRoadmapComponent implements OnInit {

  public events:any;
  public totalLength :any;

  constructor(private evenement:EvenementService) { }

  ngOnInit(): void {
    this.showEvent();
  }

  public  showEvent(){
    this.evenement.getEvenenement().subscribe(
      data=>{
        console.warn(data);
        this.events = data.reverse();
      });
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
