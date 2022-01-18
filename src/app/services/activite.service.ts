import { Activites } from './../models/activites.model';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ActiviteService {

  private getUrl = "http://127.0.0.1:8000/api"

  constructor(private http:HttpClient) { }

 
  activites = this.http.get<Activites[]>(this.getUrl +'/activite')
  

  getActivite(){
    return this.activites;
  }

  postActivite(activite:any){
    return this.http.post<any>(this.getUrl +'/activite', activite)
  }

getActiviteByID(id:number):Observable<Activites[]>{
  return this.http.get<Activites[]>(this.getUrl + '/activite/'+`${id}`) 

}

updateActivite(id:number, activite:any):Observable<any>{
  return this.http.put<any>(`${this.getUrl}/activite/${id}`,activite)
}

  DeleteActivite(id:number):Observable<{}>{
    return this.http.delete<any>(this.getUrl + '/activite/'+`${id}`)
  }

  getActiviteByStructure(id:number): Observable<any>{
    return this.http.get<any>(this.getUrl + '/structure-activite/'+`${id}`) 
  }

  getActiviteBySemaine(id:number): Observable<any>{
    return this.http.get<any>(this.getUrl + '/activite/semaine/'+`${id}`)
  }

}


