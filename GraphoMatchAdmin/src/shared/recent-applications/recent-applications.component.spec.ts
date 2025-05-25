import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentApplicationsComponent } from './recent-applications.component';

describe('RecentApplicationsComponent', () => {
  let component: RecentApplicationsComponent;
  let fixture: ComponentFixture<RecentApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentApplicationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
