import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTimeChartComponent } from './activity-time-chart.component';

describe('ActivityTimeChartComponent', () => {
  let component: ActivityTimeChartComponent;
  let fixture: ComponentFixture<ActivityTimeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityTimeChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityTimeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
