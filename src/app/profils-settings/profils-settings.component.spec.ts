import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilsSettingsComponent } from './profils-settings.component';

describe('ProfilsSettingsComponent', () => {
  let component: ProfilsSettingsComponent;
  let fixture: ComponentFixture<ProfilsSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilsSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
