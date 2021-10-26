import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteREXComponent } from './activite-rex.component';

describe('ActiviteREXComponent', () => {
  let component: ActiviteREXComponent;
  let fixture: ComponentFixture<ActiviteREXComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiviteREXComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiviteREXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
