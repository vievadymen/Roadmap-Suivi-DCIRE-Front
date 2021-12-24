import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtractRoadmapComponent } from './extract-roadmap.component';

describe('ExtractRoadmapComponent', () => {
  let component: ExtractRoadmapComponent;
  let fixture: ComponentFixture<ExtractRoadmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtractRoadmapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtractRoadmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
