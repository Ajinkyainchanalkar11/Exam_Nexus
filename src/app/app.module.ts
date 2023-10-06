import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ExamBlocksComponent } from './exam-blocks/exam-blocks.component';
import { StudentDataComponent } from './student-data/student-data.component';
import { AbsentReportHomeComponent } from './absent-report-home/absent-report-home.component';
import { ClassComponent } from './class/class.component';
import { ViewReportComponent } from './view-report/view-report.component';
import { HistoryMalpracticeComponent } from './history-malpractice/history-malpractice.component';
import { HistoryAbsentComponent } from './history-absent/history-absent.component';
import { ReportAbsentComponent } from './report-absent/report-absent.component';
import { ReportMalpracticeComponent } from './report-malpractice/report-malpractice.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ValidationReportComponent } from './validation-report/validation-report.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { ToastrModule } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DemoComponent } from './demo/demo.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
@NgModule({
  declarations: [
    AppComponent,
    ExamBlocksComponent,
    StudentDataComponent,
    AbsentReportHomeComponent,
    ClassComponent,
    ViewReportComponent,
    HistoryMalpracticeComponent,
    HistoryAbsentComponent,
    ReportAbsentComponent,
    ReportMalpracticeComponent,
    ConfirmationDialogComponent,
    ValidationReportComponent,
    DemoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    AppRoutingModule,
    BsDatepickerModule.forRoot(),
    
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatCardModule, 
    MatInputModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }