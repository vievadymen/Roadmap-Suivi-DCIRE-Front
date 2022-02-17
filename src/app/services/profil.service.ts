import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  private getUrl = "http://127.0.0.1:8000/api"

  constructor(private http:HttpClient) { }

public getProfils(){
  return this.http.get<any>(this.getUrl + '/profils')
}
}
