import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourPillarsComponent } from './four-pillars.component';

describe('FourPillarsComponent', () => {
  let component: FourPillarsComponent;
  let fixture: ComponentFixture<FourPillarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FourPillarsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourPillarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
