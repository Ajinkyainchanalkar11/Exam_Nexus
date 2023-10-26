import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-deleteteacher',
  templateUrl: './deleteteacher.component.html',
  styleUrls: ['./deleteteacher.component.css']
})
export class DeleteteacherComponent {
  teacherName: string = '';

  constructor(private http: HttpClient) {}

  deleteTeacher() {
    if (!this.teacherName) {
      alert('Please enter a teacher name.');
      return;
    }

    // Send a DELETE request to delete the teacher by name
    this.http.delete<any>(`http://localhost:8000/delete/${this.teacherName}`)
      .subscribe(
        response => {
          alert(response); // Display the response message
          this.teacherName = ''; // Clear the input field after successful deletion
        },
        error => {
          console.error('Error:', error);
          alert('Teacher is Successifully Deleted.');
        }
      );
  }
}
