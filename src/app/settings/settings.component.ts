import { Component, OnInit } from '@angular/core';
import { WorflowService } from '../services/worflow.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private workflow : WorflowService) { }

  ngOnInit(): void {
  }

  public sendWorkflow(){
    this.workflow.sendWorkflow().subscribe(
      data=>{
        console.log(data);
        alert('emails envoyés avec succés')
      }
    )
  }
}
