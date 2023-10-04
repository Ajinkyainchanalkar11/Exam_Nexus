import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../student.service';
import { HttpClient } from '@angular/common/http';
import { Student } from '../student.model';
import { DataSharingService } from '../data-sharing.service';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-exam-blocks',
  templateUrl: './exam-blocks.component.html',
  styleUrls: ['./exam-blocks.component.css']
})
export class ExamBlocksComponent implements OnInit {
  selectedDate!: string;
  studentData: Student[] = [];
  blockNumber!: string;
  isLoading = false;

  examBlocks = [
    { name: 'Block 1', id: '1' },
    { name: 'Block 2', id: '2' },
    { name: 'Block 3', id: '3' },
    { name: 'Block 4', id: '4' },
    { name: 'Block 5', id: '5' },
    { name: 'Block 6', id: '6' },
    { name: 'Block 7', id: '7' },
    { name: 'Block 8', id: '8' },
    { name: 'Block 9', id: '9' },
    { name: 'Block 10', id: '10' },
    { name: 'Block 11', id: '11' },
    { name: 'Block 12', id: '12' },
    { name: 'Block 13', id: '13' },
    { name: 'Block 14', id: '14' },
    { name: 'Block 15', id: '15' },
    { name: 'Block 16', id: '16' },
    { name: 'Block 17', id: '17' },
    { name: 'Block 18', id: '18' },
    { name: 'Block 19', id: '19' },
    { name: 'Block 20', id: '20' },
    { name: 'Block 21', id: '21' },
    { name: 'Block 22', id: '22' },
    { name: 'Block 23', id: '23' },
    { name: 'Block 24', id: '24' },
    { name: 'Block 25', id: '25' },
    { name: 'Block 26', id: '26' },
    { name: 'Block 27', id: '27' },
    { name: 'Block 28', id: '28' },
    { name: 'Block 29', id: '29' },
    { name: 'Block 30', id: '30' },
    { name: 'Block 31', id: '31' },
    { name: 'Block 32', id: '32' },
    { name: 'Block 33', id: '33' },
    { name: 'Block 34', id: '34' },
    { name: 'Block 35', id: '35' },
    { name: 'Block 36', id: '36' },
    { name: 'Block 37', id: '37' },
    { name: 'Block 38', id: '38' },
    { name: 'Block 39', id: '39' },
    { name: 'Block 40', id: '40' }
  ];
  
  private apiUrl = 'http://localhost:8000/users/blocks';

  constructor(
    private router: Router,
    private studentService: StudentService,
    private http: HttpClient,
    private sharedData: DataSharingService
  ) {}

  ngOnInit(): void {}
  onDateChange(event: MatDatepickerInputEvent<Date>): void {
    if (event.value) {
      const localDate = new Date(event.value.getTime() - (event.value.getTimezoneOffset() * 60000));
      const selectedDate = localDate.toISOString().split('T')[0];
      this.selectedDate = selectedDate;
      console.log(this.selectedDate);
    }
  }
  
  
  onBlockClick(block: any): void {
    this.blockNumber = block.id;
    this.isLoading = true;
    this.loadStudentData();
    
  }
 
  trackById(index: number, block: any): string {
    return block.id; // Assuming each block has a unique ID
  }
  
  async loadStudentData(): Promise<void> {
    const params = {
      blockNo: this.blockNumber,
      selectedDate: this.selectedDate
    };
  
    try {
      const data = await this.http.get<Student[]>(this.apiUrl, { params }).toPromise();
      if (data) {
        this.studentData = data;
        this.sharedData.studentData = data;
        this.sharedData.setProperty(this.selectedDate,this.blockNumber);

      } else {
        console.error('Error loading student data: Response is undefined');
      }
    } catch (error) {
      console.error('Error loading student data:', error);
    }
    finally {
      this.isLoading = false; // Set loading flag to false when data loading is complete
      this.router.navigate(['/students']);
    }

  }
  
}
