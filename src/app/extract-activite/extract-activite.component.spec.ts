import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtractActiviteComponent } from './extract-activite.component';

describe('ExtractActiviteComponent', () => {
  let component: ExtractActiviteComponent;
  let fixture: ComponentFixture<ExtractActiviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtractActiviteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtractActiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
