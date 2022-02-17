import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx'; 
import { EvenementService } from '../services/evenement.service';
import { StructureService } from '../services/structure.service';
import * as moment from 'moment';
import 'moment/locale/fr';
import { ExportExcelService } from '../services/export-excel.service';
import { Time, getLocaleDateTimeFormat, DatePipe } from '@angular/common';


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
  public countWeeks:any;
  public dataEvent:any;
  public eventExtract:any;
  public month:any;

  constructor(private evenement:EvenementService, private structure:StructureService,
              public ete: ExportExcelService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.showEvent();
    this.getStructure();
    this.extractEvent()

    this.startDayWeek = moment().startOf('week')
    this.endDayWeek = moment().endOf('week')
    this.weekNumber = moment().week();
    this.countWeeks = moment().weeksInYear();

    this.month = moment().month()+1;
    
    console.warn(this.month);

  }


  public  showEvent(){
    this.evenement.getEvenementByMois(moment().month()+1).subscribe(
      data=>{
        console.warn(data);
        this.events = data.reverse();
      });
  }

  myEventsByStructure(id:any,month:any){
    month = this.month
    console.log(id);
    console.log(month);
    
    this.evenement.getEvenementByStructureMois(id,month).subscribe(
      data=>{
        console.warn(data);
        this.events = data;
      }
    )
  }

  //ajouté recemment
  public passId(id:any){
    this.idEvent = id;
    console.log(id);       
 }


 public selectedStructure:any
 public getSelectedStructure(id:any):void{
  this.structure.getStructureById(id).subscribe(
    (event) => {
      console.log(event.id);  
      this.myEventsByStructure(id,this.month);
      this.selectedStructure = event.libelle
      console.log(event.libelle);
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

public extractEvent(){
  this.evenement.extractEvenement().subscribe(
    data =>{
      this.eventExtract= data  
      console.log(data);
          }
  )
}
transformDate(date: any) {
  return this.datePipe.transform(date, 'yyyy-MM-dd');
}

public   title = 'angular-export-to-excel';
dataForExcel: any = []

exportToExcel() {

  this.events.forEach((row: any) => {

    row.thematique=row.thematique
    row.start = this.transformDate(row.start)
    row.end = this.transformDate(row.end)
    row.structure= row.structure?.libelle
   
    console.log(this.dataForExcel);
    console.log(row.thematique,);
    
    
    this.dataForExcel.push(Object.values(row))

  //  this.dataForExcel.removeColums(1,1)
  })

  let reportData = {
    title: 'Roadmap DCIRE - ',
    data: this.dataForExcel,
    headers: Object.keys(this.events[0])
  }

  this.ete.exportExcel(reportData);
}

public PrevAndNextClicked = false;
public weekNumber: any;
public startDayWeek: any;
public endDayWeek: any;


public previous(weekNumber: any) {
  let datre = parseInt(weekNumber);
  if (datre > 1) {
    this.weekNumber = datre - 1;

    this.startDayWeek = moment().startOf('week').week(this.weekNumber)
    this.endDayWeek = moment().endOf('week').week(this.weekNumber)

    this.evenement.getEvenementBySemaine(this.weekNumber).subscribe(
      data => {
        console.warn(data);
        this.events = data.reverse();
      });
  }
}

public next(weekNumber: any) {

  let datre = parseInt(weekNumber);
  if (datre <= this.countWeeks) {
    this.PrevAndNextClicked = true;
    this.weekNumber = datre + 1;

    this.startDayWeek = moment().startOf('week').week(this.weekNumber)
    this.endDayWeek = moment().endOf('week').week(this.weekNumber)
  }


  this.evenement.getEvenementBySemaine(this.weekNumber).subscribe(
    data => {
      console.warn(data);
      this.events = data.reverse();
    });

}


}
