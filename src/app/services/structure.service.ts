import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StructureService {


  private getUrl = "http://127.0.0.1:8000/api"

  constructor(private http:HttpClient) { }

  struc = this.http.get<any>(this.getUrl +'/structure')

  getStructure(){
    return this.struc;
  }


getStructureById(id:number):Observable<any>{
  return this.http.get<any>(this.getUrl + '/structure/'+`${id}`) 
}

}
