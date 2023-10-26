import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nextpage',
  templateUrl: './nextpage.component.html',
  styleUrls: ['./nextpage.component.css']
})
export class NextpageComponent implements OnInit {
  selectedTeachers: any[] = [];
  selectedTeacherDetails: any = null;

  constructor(
    private dataService: DataService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.selectedTeachers = this.dataService.selectedTeachers;
  }

  goToUpdateTeacher(teacher: any) {
    this.router.navigate(['updations'], { state: { teacher } });
  }

  getSelectedTeachers() {
    // Create an array in the desired format
    const formattedData = this.selectedTeachers.map((teacher) => ({
      teacher_name: teacher.teacher_name,
      teacher_Department: teacher.teacher_Department,
      teacher_Status: teacher. teacher_Status,
      exam_date: teacher.exam_date,
      startingtime: teacher.startingtime,
      block_no: teacher.block_no
    }));

    console.log(formattedData);
    
    // Send the formatted data to the backend
    this.sendDataToBackend(formattedData);
  }

  sendDataToBackend(requestBody: any) {
    this.http.post('http://localhost:8000/save-teachers', requestBody).subscribe(
      (response: any) => {
        console.log('Teachers saved successfully.', response);
  
        // Log the saved array to the console
        console.log('Saved Array:', response);
  
      },
      (error: any) => {
        console.error('Error saving teachers:', error);
      }
    );
  }
  

  print() {
    window.print();
  }
}
