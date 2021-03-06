import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class EvenementService {

  private getUrl = "http://127.0.0.1:8000/api"

  constructor(private http:HttpClient) { }

 
  events = this.http.get<any>(this.getUrl +'/evenement')
  

  getEvenenement(){
    return this.events;
  }

  getEvenementStructure(){
    return this.http.get<any>(this.getUrl +'/structure-event')
  }

  getEvenementBySemaine(id:number){
    return this.http.get<any>(this.getUrl + '/agenda/evenement/'+`${id}`) 
  }

  getEvenementByMois(mois:number){
    return this.http.get<any>(this.getUrl + '/mois/evenement/'+`${mois}`) 
  }

  getEventById(id:number):Observable<any>{
    return this.http.get<any>(this.getUrl + '/evenement/'+`${id}`) 
  }

  getEvenementByStructure(id:number): Observable<any>{
    return this.http.get<any>(this.getUrl + '/structure/'+`${id}`) 
  }

  getEvenementByStructureMois(id:number, mois:number): Observable<any>{
    return this.http.get<any>(this.getUrl + '/structure-event-mois/'+`${id}`+ '/'+`${mois}`) 
  }

  getEvenementByStructureSemaine(id:number, semaine:number): Observable<any>{
    return this.http.get<any>(this.getUrl + '/structure-event/'+`${id}`+ '/'+`${semaine}`) 
  }

  postEvenement(event:any){
    return this.http.post<any>(this.getUrl +'/evenement', event)
  }

  DeleteEvenement(id:number):Observable<{}>{
    return this.http.delete<any>(this.getUrl +'/evenement/'+`${id}`)
  }

  updateEvenenement(id:number, evenement:any):Observable<any>{
    return this.http.put<any>(`${this.getUrl}/evenement/${id}`,evenement)
  }

  extractEvenement(){
   return  this.http.get<any>(this.getUrl +'/evenement/extraction')
  }

  sendMAilEvent(){
    return this.http.get<any>(this.getUrl + '/evenement-mail')
  }


}
