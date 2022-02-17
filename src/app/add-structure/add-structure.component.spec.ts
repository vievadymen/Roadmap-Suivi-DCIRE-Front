import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStructureComponent } from './add-structure.component';

describe('AddStructureComponent', () => {
  let component: AddStructureComponent;
  let fixture: ComponentFixture<AddStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
