import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

interface AbsentStudent {
  prn: number;
  studentname: string;
  year: string;
  programname: string;
  course: string;
  coursecode: string;
  block_no: number;
  date: string;
}

@Component({
  selector: 'app-history-absent',
  templateUrl: './history-absent.component.html',
  styleUrls: ['./history-absent.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class HistoryAbsentComponent implements OnInit {
  originalAbsentStudents: AbsentStudent[] = [];
  absentStudents: AbsentStudent[] = [];
  availableClasses = ['First-Year', 'Second-Year', 'Third-Year', 'Fourth-Year'];
  availablePrograms = ['CSE', 'CIVIL', 'MECHANICAL', 'ELECTRICAL', 'AIDS'];
  selectedClass = '';
  selectedProgram = '';
  selectedDate = '';
  isLoading: boolean = true;
  displayedColumns: string[] = ['prn', 'studentname', 'year', 'programname', 'course', 'coursecode', 'block_no', 'date'];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAbsentStudents();
  }

  fetchAbsentStudents(): void {
    this.http.get<AbsentStudent[]>('http://localhost:8000/api/absent-students/all').subscribe(
      (data) => {
        this.originalAbsentStudents = data;
        this.absentStudents = [...data]; // Make a copy
        console.log(this.originalAbsentStudents);
        this.isLoading = false; // Set isLoading to false once data is received
      },
      (error) => {
        console.error('Error fetching absent students:', error);
        this.isLoading = false; // Make sure to handle errors and set isLoading to false
      }
    );
  }

  // deleteRecord(prn: number, blockNumber: number, date: string): void {
  //   const url = `http://localhost:8000/api/absent-students/delete`;

  //   // Send the prn parameter as a query parameter in the URL
  //   const params = {
  //     prn: prn.toString() // Convert prn to string if necessary
  //   };

  //   this.http.post(url, params).subscribe(
  //     (response) => {
  //       console.log('Record deleted successfully', response);
  //       // Update your local data if needed
  //     },
  //     (error) => {
  //       console.error('Error deleting record:', error);
  //     }
  //   );
  // }

  deleteRecord(prn: number, blockNumber: number, date: string) {
    const url = `http://localhost:8000/api/absent-students/delete`;
  
    const params = {
        prn: prn,
        blockNumber: blockNumber,
        date: date
    };

    this.http.post(url, params).subscribe(
        (response: any) => {
            console.log('Record deleted successfully', response.message);
            // Update your local data if needed
        },
        (error) => {
            console.error('Error deleting record:', error);
        }
    );
}

  
  

  applyFilters(): void {
    let filteredStudents = this.originalAbsentStudents;

    if (this.selectedClass) {
      filteredStudents = filteredStudents.filter(student => student.year.includes(this.selectedClass));
    }

    if (this.selectedProgram) {
      filteredStudents = filteredStudents.filter(student => student.programname.includes(this.selectedProgram));
    }

    if (this.selectedDate) {
      filteredStudents = filteredStudents.filter(student => student.date === this.selectedDate);
    }

    this.absentStudents = filteredStudents;
  }

  clearFilters(): void {
    this.selectedClass = '';
    this.selectedProgram = '';
    this.selectedDate = '';
    this.absentStudents = this.originalAbsentStudents;
  }
}
