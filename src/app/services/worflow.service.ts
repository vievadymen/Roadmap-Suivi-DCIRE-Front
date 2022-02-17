import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WorflowService {

  private getUrl = "http://127.0.0.1:8000/api"


  constructor(private http:HttpClient) { }

  sendWorkflow():Observable<any>{
    return this.http.get<any>(this.getUrl + '/workflow') 
  }
}
