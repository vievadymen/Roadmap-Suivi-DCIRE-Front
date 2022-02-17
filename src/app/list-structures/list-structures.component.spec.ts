import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStructuresComponent } from './list-structures.component';

describe('ListStructuresComponent', () => {
  let component: ListStructuresComponent;
  let fixture: ComponentFixture<ListStructuresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListStructuresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStructuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
