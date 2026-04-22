import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WealthScoreComponent } from './wealth-score.component';

describe('WealthScoreComponent', () => {
  let component: WealthScoreComponent;
  let fixture: ComponentFixture<WealthScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WealthScoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WealthScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
