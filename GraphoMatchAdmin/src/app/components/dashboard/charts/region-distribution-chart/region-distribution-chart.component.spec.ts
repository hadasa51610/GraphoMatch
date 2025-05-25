import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionDistributionChartComponent } from './region-distribution-chart.component';

describe('RegionDistributionChartComponent', () => {
  let component: RegionDistributionChartComponent;
  let fixture: ComponentFixture<RegionDistributionChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegionDistributionChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegionDistributionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
