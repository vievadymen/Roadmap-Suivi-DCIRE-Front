import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Difficulte } from '../models/difficulte';


@Injectable({
  providedIn: 'root'
})

export class DifficulteService {


  private getUrl = "http://127.0.0.1:8000/api"

  constructor(private http:HttpClient) { }

  diff = this.http.get<any>(this.getUrl +'/difficulte')

  getDifficulte(){
    return this.diff;
  }

  postDifficulte(difficulte:any){
    return this.http.post<any>(this.getUrl +'/difficulte', difficulte)
  }

  getDifficulteById(id:number):Observable<Difficulte[]>{
    return this.http.get<Difficulte[]>(this.getUrl + '/difficulte/'+`${id}`) 

  }

  updateDifficulte(id:number, difficulte:Difficulte[]):Observable<any>{
    return this.http.put<any>(`${this.getUrl}/difficulte/${id}`,difficulte)
  }
 
  deleteDifficulte(id:number):Observable<{}>{
    return this.http.delete<any>(this.getUrl + '/difficulte/'+`${id}`)
  }

  getDifficulteBySemaine(semaine:number){
    return this.http.get<any>(this.getUrl + '/difficulte/semaine/'+`${semaine}`)
  }

  getDifficulteByStructureSemaine(id:any, semaine:any){
    return this.http.get<any>(this.getUrl + '/structure-diff/'+ `${id}`+ '/'+`${semaine}` )
  }
}
