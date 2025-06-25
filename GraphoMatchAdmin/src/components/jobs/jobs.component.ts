import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Job } from '../../models/job.model';
import { Observable } from 'rxjs';
import { JobService } from '../../services/job/job.service';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent implements OnInit {
  jobs$!: Observable<Job[]>;
  filteredJobs: Job[] = [];
  searchTerm = '';
  statusFilter = '';
  typeFilter = '';
  showModal = false;
  isEditing = false;
  editingJob: any = {};
  requirementsString = '';

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.jobs$ = this.jobService.getJobs();
    this.jobs$.subscribe(jobs => {
      this.filteredJobs = jobs;
    });
  }

  filterJobs(): void {
    this.jobs$.subscribe(jobs => {
      let filtered = jobs;
      
      if (this.searchTerm) {
        filtered = filtered.filter(job => 
          job.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          job.category.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }
      
      if (this.statusFilter) {
        filtered = filtered.filter(job => job.status === this.statusFilter);
      }
      
      if (this.typeFilter) {
        filtered = filtered.filter(job => job.type === this.typeFilter);
      }
      
      this.filteredJobs = filtered;
    });
  }

  showAddModal(): void {
    this.isEditing = false;
    this.editingJob = {
      title: '',
      description: '',
      location: '',
      type: 'full-time',
      category: '',
      status: 'active',
      salaryRange: { min: 50, max: 80 }
    };
    this.requirementsString = '';
    this.showModal = true;
  }

  editJob(job: Job): void {
    this.isEditing = true;
    this.editingJob = { ...job };
    this.requirementsString = job.requirements.join(', ');
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.editingJob = {};
    this.requirementsString = '';
  }

  saveJob(): void {
    this.editingJob.requirements = this.requirementsString.split(',').map(req => req.trim());
    
    if (this.isEditing) {
      this.jobService.updateJob(this.editingJob).subscribe(() => {
        this.closeModal();
        this.filterJobs();
      });
    } else {
      this.jobService.createJob(this.editingJob).subscribe(() => {
        this.closeModal();
        this.filterJobs();
      });
    }
  }

  toggleJobStatus(job: Job): void {
    const updatedJob = {
      ...job,
      status: job.status === 'active' ? 'inactive' as const : 'active' as const
    };
    
    this.jobService.updateJob(updatedJob).subscribe(() => {
      this.filterJobs();
    });
  }
}