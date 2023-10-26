import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  selectedTeachers: any[] = [];

  constructor() {}

  setSelectedTeachers(teachers: any[]) {
    this.selectedTeachers = teachers;
  }

  getSelectedTeachers() {
    return this.selectedTeachers;
  }
}
