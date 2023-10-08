import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
interface MalpracticeStudent {
  prn: number;
  studentname: string;
  year: string;
  programname: string;
  course: string;
  coursecode: string;
  block_no: number;
  date: string;
  attendance: boolean;
  malpractice: boolean;
}

@Component({
  selector: 'app-history-malpractice',
  templateUrl: './history-malpractice.component.html',
  styleUrls: ['./history-malpractice.component.css',]
  
})
export class HistoryMalpracticeComponent implements OnInit {
  originalMalpracticeStudents: MalpracticeStudent[] = [];
  malPracticeStudents: MalpracticeStudent[] = [];
  availableClasses = ['First-Year', 'Second-Year', 'Third-Year', 'Fourth-Year'];
  availablePrograms = ['CSE', 'CIVIL', 'MECHANICAL', 'ELECTRICAL', 'AIDS'];
  selectedClass = '';
  selectedProgram = '';
  selectedDate = '';
  isLoading: boolean = true;

  constructor(private http: HttpClient,private toastr: ToastrService) {}

  ngOnInit(): void {
    this.fetchMalpracticeStudents();
  }

  fetchMalpracticeStudents(): void {
    this.http.get<MalpracticeStudent[]>('http://localhost:8000/api/MalPractice-students/all').subscribe(
      (data) => {
        this.originalMalpracticeStudents = data;
        this.malPracticeStudents = [...data]; // Make a copy
        this.isLoading = false; // Set isLoading to false once data is received
      },
      (error) => {
        console.error('Error fetching malpractice students:', error);
        this.isLoading = false; // Make sure to handle errors and set isLoading to false
      }
    );
  }

  applyFilters(): void {
    let filteredStudents = this.originalMalpracticeStudents;

    if (this.selectedClass) {
      filteredStudents = filteredStudents.filter(student => student.year.includes(this.selectedClass));
    }

    if (this.selectedProgram) {
      filteredStudents = filteredStudents.filter(student => student.programname.includes(this.selectedProgram));
    }

    if (this.selectedDate) {
      filteredStudents = filteredStudents.filter(student => student.date === this.selectedDate);
    }

    this.malPracticeStudents = filteredStudents;
  }

  clearFilters(): void {
    this.selectedClass = '';
    this.selectedProgram = '';
    this.selectedDate = '';
    this.malPracticeStudents = this.originalMalpracticeStudents;
  }

  deleteRecord(prn: number, blockNumber: number, date: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        const url = `http://localhost:8000/api/MalPractice-students/delete`;
        const params = {
          prn: prn,
          blockNumber: blockNumber,
          date: date
        };
  
        this.http.post(url, params).subscribe(
          (response: any) => {
            console.log('Record deleted successfully', response.message);
            this.malPracticeStudents = this.malPracticeStudents.filter(s => s.prn !== prn);
            this.toastr.success('Record deleted successfully');
          },
          (error) => {
            console.error('Error deleting record:', error);
            this.toastr.error('Error deleting record');
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your record is safe :)', 'error');
      }
    });
}
}