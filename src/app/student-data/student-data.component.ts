import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../student.model';
import { DataSharingService } from '../data-sharing.service';
import { StudentService } from '../student.service';
import Swal from 'sweetalert2';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
interface ConfirmationDialog {
  title: string;
  html: string;
  icon: 'question' | 'error' | 'success' | 'warning' | 'info';
  showCancelButton: boolean;
  confirmButtonText: string;
  cancelButtonText: string;
}

@Component({
  selector: 'app-student-data',
  templateUrl: './student-data.component.html',
  styleUrls: ['./student-data.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class StudentDataComponent implements OnInit {
  blockNumber!: string;
  studentData: Student[] = [];
  show = true;
  selectedDate!: string;
  selectedBlockNumber!: string;
  displayedColumns: string[] = ['prn', 'studentName', 'program', 'class', 'course', 'courseCode', 'blockNo', 'date', 'attendance', 'malpractice'];


  constructor(
    private http: HttpClient,
    private sharedData: DataSharingService,
    private studentService: StudentService,
    private router:Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadStudentData();
    this.show = true;
  }
  trackByFn(index: number, item: any): number {
    return item.id; // Replace 'id' with the actual unique identifier of your student object
  }
  

  toggleMalpractice(student: Student) {
    student.malpractice = !student.malpractice;
  }

  toggleAttendance(student: Student) {
    student.attendance = !student.attendance;
  }

  openConfirmationDialog(): void {
    const absentStudents = this.studentData.filter(student => student.attendance);
    const malpracticeStudents = this.studentData.filter(student => student.malpractice);

    const absentStudentsTable = this.generateTable(absentStudents);
    const malpracticeStudentsTable = this.generateTable(malpracticeStudents);

    const confirmationDialog: ConfirmationDialog = {
      title: 'Confirmation',
      html: `
        <p>Are you sure you want to save the report for the following students?</p>
        <strong>Absent Students:</strong><br>
        ${absentStudentsTable || 'None'}<br><br>
        <strong>Students with Malpractice:</strong><br>
        ${malpracticeStudentsTable || 'None'}
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    };

    Swal.fire(confirmationDialog).then((result) => {
      if (result.isConfirmed) {
        this.checkReportGenerated();
      }
    });
  }

  generateTable(students: Student[]): string {
    if (students.length === 0) {
      return '';
    }

    let tableHtml = '<table style="border-collapse: collapse; width: 100%;">';
    tableHtml += '<thead style="background-color: #f0f0f0;">';
    tableHtml += '<tr>';
    tableHtml += '<th style="border: 1px solid #ddd; padding: 8px;">PRN</th>';
    tableHtml += '<th style="border: 1px solid #ddd; padding: 8px;">Name</th>';
    tableHtml += '</tr>';
    tableHtml += '</thead>';
    tableHtml += '<tbody>';

    students.forEach(student => {
      tableHtml += '<tr>';
      tableHtml += `<td style="border: 1px solid #ddd; padding: 8px;">${student.prn}</td>`;
      tableHtml += `<td style="border: 1px solid #ddd; padding: 8px;">${student.studentname}</td>`;
      tableHtml += '</tr>';
    });

    tableHtml += '</tbody></table>';

    return tableHtml;
  }

  saveReport(absentStudents: Student[], malpracticeStudents: Student[]): void {
    const saveData = (students: Student[], type: string): void => {
      if (students.length > 0) {
        const serviceMethod = type === 'absent' ? 'saveAbsentStudents' : 'saveMalpracticeStudents';
        this.studentService[serviceMethod](students).subscribe(
          (response: any) => {
            if (response && response === 'Data saved successfully') {
              console.log(`${type.charAt(0).toUpperCase() + type.slice(1)} Students data saved successfully`);
            } else {
              console.error(`Unexpected response from the server for ${type.charAt(0).toUpperCase() + type.slice(1)} Students:`, response);
            }
          },
          (error) => {
            console.error(`Error saving ${type.charAt(0).toUpperCase() + type.slice(1)} Students data:`, error);
          }
        );
      }
    };

    saveData(absentStudents, 'absent');
    saveData(malpracticeStudents, 'malpractice');
    this.toastr.success(`Data saved successfully for block ${this.selectedBlockNumber}`, 'Success');

    this.router.navigate(['exam-blocks']);

  }

  loadStudentData(): void {
    this.studentData = this.sharedData.studentData;
    this.selectedBlockNumber = this.sharedData.selectedBlockNumber;
    this.selectedDate = this.sharedData.selectedDate;
  }

  checkReportGenerated(): void {
    const blockNumber = this.selectedBlockNumber;
    const date = this.selectedDate;
    this.http.get(`http://localhost:8000/api/absent-students/report/generated?blockNumber=${blockNumber}&date=${date}`)
      .subscribe(
        (reportGenerated) => {
          if (reportGenerated) {
            Swal.fire('Report Already Generated', `Report has already been generated for Block ${blockNumber} on ${date}.`, 'info');
            this.toastr.error('Error while generating report', 'Error');
            this.router.navigate(['exam-blocks']);
          } else {
            this.saveReport(this.studentData.filter(student => student.attendance), this.studentData.filter(student => student.malpractice));
          }
        },
        (error) => {
          console.error('Error checking report generation status:', error);
        }
      );
  }
}
