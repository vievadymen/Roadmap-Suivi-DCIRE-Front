import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { AbstractControl, FormArray,FormBuilder, FormGroup, Validators,  } from '@angular/forms';
import { StructureService } from '../services/structure.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-structure',
  templateUrl: './add-structure.component.html',
  styleUrls: ['./add-structure.component.scss']
})
export class AddStructureComponent implements OnInit {
  
  submitted = false;


  addStruct=new FormGroup({
    libelle: new FormControl(''),
   
  });

  constructor(private fb:FormBuilder, private structure: StructureService, private _router: Router,
              private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.addStruct = this.fb.group({
      libelle:['', Validators.required],
    });
  }

  get f() { return this.addStruct.controls  }

  public addStructure(){
    this.submitted = true;
    if (this.addStruct.invalid) {
      return;
  }
    this.structure.postStructure(this.addStruct.value).subscribe(
      data=>{
        console.log(data);
      },
      (error)=>{
        console.log(error);
      }
    )

   setTimeout(function() {alert('Structure ajoutée avec succes')});

    this.addStruct.reset();
   this._router.navigate(['../list-structure'], { relativeTo: this.route })

   
  console.log('bien enregistré!!');
  
  }

}
