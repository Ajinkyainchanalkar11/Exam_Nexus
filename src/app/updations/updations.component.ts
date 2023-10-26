import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../data-sharing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updations',
  templateUrl: './updations.component.html',
  styleUrls: ['./updations.component.css']
})
export class UpdationsComponent implements OnInit {
  selectedTeachers: any[] = [];
  teacherIndex: number=0;
  teacherName: string='';
  teacherDepart: string='';
  teacherStatus: string='';

  constructor(private dataSharingService: DataSharingService,private route: Router) {}

  ngOnInit() {
    this.selectedTeachers = this.dataSharingService.getSelectedTeachers();
  }

 
  updateTeacher() {
    // Retrieve the values from the form fields
    const index = this.teacherIndex;
    const updatedName = this.teacherName;
    const updatedDepartment = this.teacherDepart;
    const updatedStatus = this.teacherStatus;

    // Check if the index is valid
    if (index >= 0 && index < this.selectedTeachers.length) {
      // Update the selected teacher's information
      const selectedTeacher = this.selectedTeachers[index];
      selectedTeacher.teacher_name = updatedName;
      selectedTeacher.techer_depart = updatedDepartment;
      selectedTeacher.teacher_status = updatedStatus;

      // Optionally, you can call a service to save the updated data to a backend server.
      // For example: this.dataSharingService.updateTeacher(selectedTeacher);

      // Log the updated array to the console
      console.log('Updated selectedTeachers:', this.selectedTeachers);

      // Clear the form fields after the update (if needed)
      this.resetFormFields();
    } else {
      // Handle invalid index (e.g., display an error message)
      console.error('Invalid index provided.');
    }
  }

  resetFormFields() {
    this.teacherIndex = 0;
    this.teacherName = '';
    this.teacherDepart = '';
    this.teacherStatus = '';
  }
save(){
  this.route.navigate(['/nextpage'])

}
}
