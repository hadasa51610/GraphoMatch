import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActivityChartComponent } from './user-activity-chart.component';

describe('UserActivityChartComponent', () => {
  let component: UserActivityChartComponent;
  let fixture: ComponentFixture<UserActivityChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserActivityChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserActivityChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
