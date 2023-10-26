import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-show-chart',
  templateUrl: './show-chart.component.html',
  styleUrls: ['./show-chart.component.css']
})
export class ShowChartComponent implements OnInit {
  fetch12: any[] = [];
  teacher1Data: any[] = [];
  selectedTeachers: any[] = [];
  availableBlockNumbers: number[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:8000/all').subscribe((fetch12) => {
      shuffleArray(fetch12);
      this.fetch12 = fetch12;
      this.initializeCheckboxes();
    });

    this.http.get<any[]>('http://localhost:8000/fetch1').subscribe((data) => {
      this.teacher1Data = data;
      this.addCheckboxesBasedOnTeacher1Data();
      console.log('Fetched teacher1Data:', this.teacher1Data);
    });

    this.fetchBlockNumbersFromOtherTable(); // Call the function to fetch data from 'fetch2'.
  }

  initializeCheckboxes() {
    this.fetch12.forEach((teacher) => {
      teacher.selectedCheckboxes = new Array(this.teacher1Data.length).fill(false);
    });
  }

  addCheckboxesBasedOnTeacher1Data() {
    this.fetch12.forEach((teacher) => {
      teacher.selectedCheckboxes.push(false);
    });
  }

  fetchBlockNumbersFromOtherTable() {
    this.http.get<number[]>('http://localhost:8000/values').subscribe((data) => {
      this.availableBlockNumbers = data;
      console.log('Fetched available block numbers from the other table:', this.availableBlockNumbers);
    });
  }

  onCheckboxChange(teacherData: any, colIndex: number) {
    if (this.availableBlockNumbers.length > 0) {
      const selectedTeacher = {
        teacher_name: teacherData.teacher_name,
        teacher_Department: teacherData.teacher_status,
        teacher_Status:teacherData.techer_depart,
        day: this.teacher1Data[colIndex].day,
        exam_date: this.teacher1Data[colIndex].date,
        startingtime: this.teacher1Data[colIndex].startTime,
       
        block_no: this.availableBlockNumbers.pop(),
      };

      this.selectedTeachers.push(selectedTeacher);
    }
  }

  getSelectedTeachers() {
    const requestBody = this.selectedTeachers.map((teacher: any) => ({
      teacher_name: teacher.teacher_name,
      teacher_Department: teacher.teacher_status,
      teacher_Status: teacher.techer_depart,
      day: teacher.day,
      exam_date: teacher.day,
      startingtime: teacher.startTime,
     
      block_no: teacher.block_no
    }));
    console.log(this.selectedTeachers)

    this.sendDataToBackend(requestBody);
  }
  async deleteTableContent() {
    try {
      // Make an HTTP DELETE request to delete the table content
      await this.http.delete('http://localhost:8000/deleteAll').toPromise();
      console.log('Table content deleted successfully.');
    } catch (error) {
      console.error('Error deleting table content:', error);
    }
  }

  async getselectedTeacherService() {
    // Call the deleteTableContent function to delete the table content.
    await this.deleteTableContent();

    // Continue with existing functionality, for example, navigating to the next page.
    const requestBody = {
      teacherNames: this.selectedTeachers.map((teacher: any) => teacher.teacher_name),
    };
    this.dataService.selectedTeachers = this.selectedTeachers;
    this.router.navigate(['/nextpage'], { state: { selectedData: requestBody } });
  }



  

  sendDataToBackend(requestBody: any) {
    console.log('Data to be sent to the database:', requestBody);

    this.http.post('http://localhost:8000/save-teachers', requestBody).subscribe(
      (response) => {
        console.log('Teachers saved successfully.', response);
      },
      (error) => {
        console.error('Error saving teachers:', error);
      }
    );
  }
}

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
