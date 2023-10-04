// validation-report.component.ts

import { Component } from '@angular/core';
import { ValidationReportService } from '../validation-report.service';
import { Router } from '@angular/router';
import { ReportService } from '../report-service.service';

@Component({
  selector: 'app-validation-report',
  templateUrl: './validation-report.component.html',
  styleUrls: ['./validation-report.component.css']
})
export class ValidationReportComponent {
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
    this.isLoading = true;
    this.loadingMessage = `Generating ${this.reportType === 'absent' ? 'Absent' : 'Malpractice'} Report...`;

    if (this.reportType === 'Absent') {
      this.generateAbsent();
    } else if (this.reportType === 'Malpractice') {
      this.generateMalpractice();
    }
  }
  generateAbsent(){
    this.validationReportService.getAbsentValidationReport(this.examYear, this.selectedClass, this.selectedExam)
      .subscribe(
        data => {
          this.reportService.setReportData(data); // Set the report data in the service
          this.reportService.setReportProperty(this.reportType,this.selectedExam,this.selectedClass);
          this.router.navigate(['report-absent']);
        },
        error => {
          console.error('Error fetching data', error);
        }
      )
      setTimeout(() => {
        // After report is generated
        this.isLoading = false;
      }, 3000); // Simulating 3 seconds for report generation
  }
  generateMalpractice(){
    this.validationReportService.getMalPracticeValidationReport(this.examYear, this.selectedClass, this.selectedExam)
      .subscribe(
        data => {
          this.reportService.setReportData(data); // Set the report data in the service
          this.reportService.setReportProperty(this.reportType,this.selectedExam,this.selectedClass);
          this.router.navigate(['report-absent']);
        },
        error => {
          console.error('Error fetching data', error);
        }
      )
      setTimeout(() => {
        // After report is generated
        this.isLoading = false;
      }, 3000); // Simulating 3 seconds for report generation
  }
}
