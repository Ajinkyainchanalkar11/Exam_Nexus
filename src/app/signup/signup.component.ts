import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  teacherData = {
    teacher_name: '',
    techer_depart: '',
    teacher_status: ''


  };

  constructor(private http: HttpClient, private route: Router) {}


  register() {
    this.http.post("http://localhost:8000/save", this.teacherData).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Teacher is registered!!");
      this.resetForm();
    });

    console.log(this.teacherData);
    
  }

  resetForm() {
    this.teacherData = {
      teacher_name: '',
      techer_depart: '',
      teacher_status: ''
    };
  }
}
