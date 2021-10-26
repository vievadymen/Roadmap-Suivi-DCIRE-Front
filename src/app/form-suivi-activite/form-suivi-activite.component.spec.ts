import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSuiviActiviteComponent } from './form-suivi-activite.component';

describe('FormSuiviActiviteComponent', () => {
  let component: FormSuiviActiviteComponent;
  let fixture: ComponentFixture<FormSuiviActiviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSuiviActiviteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSuiviActiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
