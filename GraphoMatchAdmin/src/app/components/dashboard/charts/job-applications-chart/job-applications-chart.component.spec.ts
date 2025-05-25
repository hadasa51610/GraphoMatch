import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicationsChartComponent } from './job-applications-chart.component';

describe('JobApplicationsChartComponent', () => {
  let component: JobApplicationsChartComponent;
  let fixture: ComponentFixture<JobApplicationsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobApplicationsChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobApplicationsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
