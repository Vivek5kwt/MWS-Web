import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiIntelligenceComponent } from './ai-intelligence.component';

describe('AiIntelligenceComponent', () => {
  let component: AiIntelligenceComponent;
  let fixture: ComponentFixture<AiIntelligenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AiIntelligenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiIntelligenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
