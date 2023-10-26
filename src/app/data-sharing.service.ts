import { Injectable } from '@angular/core';
import { Student } from './student.model';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  
  studentData: Student[] = [];
  selectedDate!:string;
  selectedBlockNumber!:string;
  selectedTeachers: any[] = [];
  private absentStudentsData: any[] = [];

  setAbsentStudents(data: any[]): void {
    this.absentStudentsData = data;
  }

  getAbsentStudents(): any[] {
    return this.absentStudentsData;
  }
  setProperty(selecteddate:string,selectedblock:string){
    this.selectedDate=selecteddate;
    this.selectedBlockNumber=selectedblock;
  }
  getStudentData(){
    return this.studentData;
  }


  setSelectedTeachers(teachers: any[]) {
    this.selectedTeachers = teachers;
  }

  getSelectedTeachers() {
    return this.selectedTeachers;
  }
}
