// validation-report.component.ts

import { Component, ViewChild } from '@angular/core';
import { ValidationReportService } from '../validation-report.service';
import { Router } from '@angular/router';
import { ReportService } from '../report-service.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-validation-report',
  templateUrl: './validation-report.component.html',
  styleUrls: ['./validation-report.component.css']
})
export class ValidationReportComponent {
  @ViewChild('reportForm') reportForm!: NgForm; // Added ViewChild

  selectedClass: string = '';
  selectedExam: string = '';
  examYear: string = '';
  reportType!: string;
  isLoading: boolean = false;
  loadingMessage: string = '';

  constructor(
    private validationReportService: ValidationReportService,
    private router: Router,
    private reportService: ReportService
  ) { }

  generateReport() {
    if (this.reportForm.valid) { // Checking if the form is valid
      this.isLoading = true;
      this.loadingMessage = `Generating ${this.reportType === 'Absent' ? 'Absent' : 'Malpractice'} Report...`;

      if (this.reportType === 'Absent') {
        this.generateAbsent();
      } else if (this.reportType === 'Malpractice') {
        this.generateMalpractice();
      }
    } else {
      // Handle case where form is not valid (optional)
    }
  }

  generateAbsent() {
    this.validationReportService.getAbsentValidationReport(this.examYear, this.selectedClass, this.selectedExam)
      .subscribe(
        data => {
          if (data.length === 0) {
            Swal.fire({
              icon: 'info',
              title: 'No Records Found',
              text: 'There are no records available for this criteria.',
              confirmButtonText: 'OK'
            });
          } else {
            this.reportService.setReportData(data);
            this.reportService.setReportProperty(this.reportType, this.selectedExam, this.selectedClass);
            this.router.navigate(['report-absent']);
          }
        },
        error => {
          console.error('Error fetching data', error);
        }
      );
  
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }
  
  generateMalpractice() {
    this.validationReportService.getMalPracticeValidationReport(this.examYear, this.selectedClass, this.selectedExam)
      .subscribe(
        data => {
          if (data.length === 0) {
            Swal.fire({
              icon: 'info',
              title: 'No Records Found',
              text: 'There are no records available for this criteria.',
              confirmButtonText: 'OK'
            });
          } else {
            this.reportService.setReportData(data);
            this.reportService.setReportProperty(this.reportType, this.selectedExam, this.selectedClass);
            this.router.navigate(['report-absent']);
          }
        },
        error => {
          console.error('Error fetching data', error);
        }
      );
  
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }
  
}
