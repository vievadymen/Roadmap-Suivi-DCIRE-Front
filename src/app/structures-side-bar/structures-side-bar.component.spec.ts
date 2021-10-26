import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructuresSideBarComponent } from './structures-side-bar.component';

describe('StructuresSideBarComponent', () => {
  let component: StructuresSideBarComponent;
  let fixture: ComponentFixture<StructuresSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructuresSideBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructuresSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
